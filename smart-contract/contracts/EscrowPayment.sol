// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract EscrowPayment is ReentrancyGuard {

    // CONSTANTS
    uint256 public constant PLATFORM_FEE_BPS = 3; // 0.03%
    uint256 public constant MIN_AMOUNT = 0.001 ether;
    uint256 public constant MAX_SELLER_DEADLINE = 30 days;
    uint256 public constant BUYER_REVIEW_PERIOD = 7 days;


    // ENUM
    enum EscrowStatus {
        CREATED,
        FUNDED,
        DELIVERED,
        RELEASED,
        REFUNDED,
        CANCELLED
    }


    // STRUCT
    struct Escrow {

        uint256 id;

        address buyer;

        address seller;

        address token;          // address(0) = ETH

        uint256 amount;

        uint256 platformFee;

        uint256 createdAt;

        uint256 fundedAt;

        uint256 sellerDeadline;

        uint256 deliveredAt;

        uint256 releasedAt;

        EscrowStatus status;

    }


    // STATE VARIABLE
    uint256 public escrowCounter;

    address public immutable platformWallet;

    mapping(uint256 => Escrow) private escrows;

    mapping(address => uint256[]) private userEscrows;

    mapping(uint256 => string) private escrowTxHashes;


    // EVENTS
    event EscrowCreated(

        uint256 indexed escrowId,

        address indexed buyer,

        address indexed seller,

        address token,

        uint256 amount,

        uint256 sellerDeadline

    );

    event EscrowFunded(

        uint256 indexed escrowId,

        uint256 amount

    );

    event Delivered(

        uint256 indexed escrowId,

        uint256 deliveredAt

    );

    event Released(

        uint256 indexed escrowId,

        address seller,

        uint256 sellerAmount,

        uint256 platformFee

    );

    event Refunded(

        uint256 indexed escrowId,

        address buyer,

        uint256 amount

    );

    event Cancelled(

        uint256 indexed escrowId

    );

    event TimeoutRefunded(

        uint256 indexed escrowId,

        address buyer,

        uint256 amount

    );

    event TimeoutReleased(

        uint256 indexed escrowId,

        address seller,

        uint256 sellerAmount,

        uint256 platformFee

    );

    /* ============================================================
                        CONSTRUCTOR
    ============================================================ */

    constructor(address _platformWallet) {

        require(

            _platformWallet != address(0),

            "Invalid platform wallet"

        );

        platformWallet = _platformWallet;

    }

    /* ============================================================
                        MODIFIERS
    ============================================================ */

    modifier escrowExists(uint256 escrowId) {

        require(

            escrowId > 0 &&
            escrowId <= escrowCounter,

            "Escrow not found"

        );

        _;

    }

    modifier onlyBuyer(uint256 escrowId) {

        require(

            escrows[escrowId].buyer == msg.sender,

            "Only buyer"

        );

        _;

    }

    modifier onlySeller(uint256 escrowId) {

        require(

            escrows[escrowId].seller == msg.sender,

            "Only seller"

        );

        _;

    }

    modifier onlyStatus(

        uint256 escrowId,

        EscrowStatus status

    ) {

        require(

            escrows[escrowId].status == status,

            "Invalid escrow status"

        );

        _;

    }

    /* ============================================================
                        CREATE ESCROW
    ============================================================ */

    function createEscrow(

        address seller,

        address token,

        uint256 amount,

        uint256 sellerDeadline

    )

        external

    {

        require(
            seller != address(0),
            "Invalid seller"
        );

        require(
            seller != msg.sender,
            "Buyer cannot be seller"
        );

        require(
            amount >= MIN_AMOUNT,
            "Amount too small"
        );

        require(
            sellerDeadline > block.timestamp,
            "Invalid deadline"
        );

        require(
            sellerDeadline <=
            block.timestamp + MAX_SELLER_DEADLINE,
            "Deadline too long"
        );

        escrowCounter++;

        uint256 fee =
            (amount * PLATFORM_FEE_BPS) / 10000;

        escrows[escrowCounter] = Escrow({

            id: escrowCounter,

            buyer: msg.sender,

            seller: seller,

            token: token,

            amount: amount,

            platformFee: fee,

            createdAt: block.timestamp,

            fundedAt: 0,

            sellerDeadline: sellerDeadline,

            deliveredAt: 0,

            releasedAt: 0,

            status: EscrowStatus.CREATED

        });

        userEscrows[msg.sender].push(
            escrowCounter
        );

        userEscrows[seller].push(
            escrowCounter
        );

        emit EscrowCreated(

            escrowCounter,

            msg.sender,

            seller,

            token,

            amount,

            sellerDeadline

        );

    }

    /* ============================================================
                        CANCEL ESCROW
    ============================================================ */

    function cancelEscrow(

        uint256 escrowId

    )

        external

        escrowExists(escrowId)

        onlyBuyer(escrowId)

        onlyStatus(
            escrowId,
            EscrowStatus.CREATED
        )

    {

        escrows[escrowId].status =
            EscrowStatus.CANCELLED;

        emit Cancelled(
            escrowId
        );

    }

    /* ============================================================
                        FUND ESCROW
    ============================================================ */

    function fund(

        uint256 escrowId

    )

        external

        payable

        escrowExists(escrowId)

        onlyBuyer(escrowId)

        onlyStatus(
            escrowId,
            EscrowStatus.CREATED
        )

        nonReentrant

    {

        Escrow storage escrow =
            escrows[escrowId];

        if (
            escrow.token == address(0)
        ) {

            require(
                msg.value == escrow.amount,
                "Invalid ETH amount"
            );

        }

        else {

            require(
                msg.value == 0,
                "ETH not required"
            );

            bool success =
                IERC20(escrow.token)
                .transferFrom(

                    msg.sender,

                    address(this),

                    escrow.amount

                );

            require(
                success,
                "Transfer failed"
            );

        }

        escrow.fundedAt = block.timestamp;

        escrow.status =
            EscrowStatus.FUNDED;

        emit EscrowFunded(

            escrowId,

            escrow.amount

        );

    }


    /* ============================================================
                        MARK DELIVERED
    ============================================================ */

    function markDelivered(

        uint256 escrowId

    )

        external

        escrowExists(escrowId)

        onlySeller(escrowId)

        onlyStatus(
            escrowId,
            EscrowStatus.FUNDED
        )

    {

        Escrow storage escrow =
            escrows[escrowId];

        require(

            block.timestamp <=
            escrow.sellerDeadline,

            "Seller deadline exceeded"

        );

        escrow.deliveredAt =
            block.timestamp;

        escrow.status =
            EscrowStatus.DELIVERED;

        emit Delivered(

            escrowId,

            escrow.deliveredAt

        );

    }

    /* ============================================================
                    CONFIRM RELEASE
    ============================================================ */

    function confirmRelease(

        uint256 escrowId

    )

        external

        escrowExists(escrowId)

        onlyBuyer(escrowId)

        onlyStatus(
            escrowId,
            EscrowStatus.DELIVERED
        )

        nonReentrant

    {

        Escrow storage escrow =
            escrows[escrowId];

        escrow.releasedAt = block.timestamp;

        escrow.status =
            EscrowStatus.RELEASED;

        uint256 sellerAmount =
            escrow.amount -
            escrow.platformFee;

        if (escrow.token == address(0)) {

            payable(escrow.seller).transfer(
                sellerAmount
            );

            payable(platformWallet).transfer(
                escrow.platformFee
            );

        }

        else {

            IERC20 token =
                IERC20(escrow.token);

            require(

                token.transfer(

                    escrow.seller,

                    sellerAmount

                ),

                "Seller transfer failed"

            );

            require(

                token.transfer(

                    platformWallet,

                    escrow.platformFee

                ),

                "Platform fee failed"

            );

        }

        emit Released(

            escrowId,

            escrow.seller,

            sellerAmount,

            escrow.platformFee

        );

    }



    // 
    function saveTxHash(
        uint256 escrowId,
        string calldata txHash
    )
        external
        escrowExists(escrowId)
    {
        require(
            msg.sender == escrows[escrowId].buyer ||
            msg.sender == escrows[escrowId].seller,
            "Unauthorized"
        );

        require(
            escrows[escrowId].status ==
            EscrowStatus.RELEASED,
            "Escrow not released"
        );

        require(
            bytes(escrowTxHashes[escrowId]).length == 0,
            "Hash already saved"
        );

        escrowTxHashes[escrowId] = txHash;
    }

    /* ============================================================
                    CLAIM TIMEOUT REFUND
    ============================================================ */

    function claimTimeoutRefund(

        uint256 escrowId

    )

        external

        escrowExists(escrowId)

        onlyBuyer(escrowId)

        onlyStatus(
            escrowId,
            EscrowStatus.FUNDED
        )

        nonReentrant

    {

        Escrow storage escrow =
            escrows[escrowId];

        require(

            block.timestamp >
            escrow.sellerDeadline,

            "Seller deadline not reached"

        );

        escrow.status =
            EscrowStatus.REFUNDED;

        if (escrow.token == address(0)) {

            payable(escrow.buyer).transfer(

                escrow.amount

            );

        }

        else {

            IERC20 token =
                IERC20(escrow.token);

            require(

                token.transfer(

                    escrow.buyer,

                    escrow.amount

                ),

                "Refund failed"

            );

        }

        emit TimeoutRefunded(

            escrowId,

            escrow.buyer,

            escrow.amount

        );

    }

    /* ============================================================
                    CLAIM TIMEOUT RELEASE
    ============================================================ */

    function claimTimeoutRelease(

        uint256 escrowId

    )

        external

        escrowExists(escrowId)

        onlySeller(escrowId)

        onlyStatus(
            escrowId,
            EscrowStatus.DELIVERED
        )

        nonReentrant

    {

        Escrow storage escrow =
            escrows[escrowId];

        require(

            escrow.deliveredAt != 0,

            "Escrow not delivered"

        );

        require(

            block.timestamp >=
            escrow.deliveredAt +
            BUYER_REVIEW_PERIOD,

            "Buyer review period not finished"

        );

        escrow.releasedAt = block.timestamp;

        escrow.status =
            EscrowStatus.RELEASED;

        uint256 sellerAmount =
            escrow.amount -
            escrow.platformFee;

        if (escrow.token == address(0)) {

            payable(escrow.seller).transfer(

                sellerAmount

            );

            payable(platformWallet).transfer(

                escrow.platformFee

            );

        }

        else {

            IERC20 token =
                IERC20(escrow.token);

            require(

                token.transfer(

                    escrow.seller,

                    sellerAmount

                ),

                "Seller transfer failed"

            );

            require(

                token.transfer(

                    platformWallet,

                    escrow.platformFee

                ),

                "Platform fee failed"

            );

        }

        emit TimeoutReleased(

            escrowId,

            escrow.seller,

            sellerAmount,

            escrow.platformFee

        );

    }

    /* ============================================================
                        VIEW FUNCTIONS
    ============================================================ */

    function getEscrow(

        uint256 escrowId

    )

        external

        view

        escrowExists(escrowId)

        returns (
            Escrow memory
        )

    {

        return escrows[escrowId];

    }

    function getUserEscrows(

        address user

    )

        external

        view

        returns (
            uint256[] memory
        )

    {

        return userEscrows[user];

    }


    function getTxHash(
        uint256 escrowId
    )
        external
        view
        escrowExists(escrowId)
        returns (string memory)
    {

        return escrowTxHashes[escrowId];

    }

    function getEscrowCount()

        external

        view

        returns (
            uint256
        )

    {

        return escrowCounter;

    }

}