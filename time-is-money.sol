// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract TimeIsMoney {
    address payable private organizer;
    uint private festivalDate;

    mapping(address => uint) private tickets;
    mapping(address => bool) private paidArtists;
    mapping(address => bool) private hasBeenPaid;

    constructor(uint _festivalDate) {
        organizer = payable(msg.sender);
        festivalDate = _festivalDate;
    }

    function buyTicket() public payable {
        uint ticketPrice = block.timestamp <= festivalDate - 10 days
            ? 0.01 ether
            : 0.1 ether;

        require(msg.value >= ticketPrice, "Insufficient payment");

        tickets[msg.sender] += 1;
    }

    function ticketsOf(address user) public view returns (uint) {
        return tickets[user];
    }

    function addPayedArtist(address artist) public {
        require(msg.sender == organizer, "Only organizer can add artists");

        paidArtists[artist] = true;
    }

    function getPayed() public {
        require(paidArtists[msg.sender], "Not a registered artist");
        require(!hasBeenPaid[msg.sender], "Artist already paid");
        require(block.timestamp >= festivalDate + 3 days, "Available 3 days after festival");
        require(address(this).balance >= 1 ether, "Insufficient funds");

        hasBeenPaid[msg.sender] = true;

        (bool sent, ) = payable(msg.sender).call{value: 1 ether}("");
        require(sent, "Payment failed");
    }

    function getBenefits() public {
        require(msg.sender == organizer, "Only organizer can withdraw");
        require(
            block.timestamp >= festivalDate + 10 days,
            "Available 10 days after festival"
        );

        uint amount = address(this).balance;

        (bool sent, ) = organizer.call{value: amount}("");
        require(sent, "Transfer failed");
    }
}