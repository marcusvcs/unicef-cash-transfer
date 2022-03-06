pragma solidity ^0.8.12;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Registry is Ownable {
    struct ImplementingPartnerInfo {
        uint64 LegalEntityIdentifier;
        string name;
    }

    uint16 _id=0;

    mapping(address => ImplementingPartnerInfo) public ImplementingPartners;
    mapping(uint16 => address) public ImplementingPartnersList;

    function isOwner(address addr) public view returns (bool) {
        return (addr == owner());
    }

    function isRegistered(address addr) public view returns (bool) {
        return ImplementingPartners[addr].LegalEntityIdentifier != 0;
    }

    function lastId() public view returns (uint16) {
        return _id;
    }

    function registerImplementingPartner(
        uint64 _legalEntityIdentifier,
        string memory _name,
        address addr
    ) public onlyOwner {
        ImplementingPartners[addr] = ImplementingPartnerInfo(
            _legalEntityIdentifier,
            _name
        );
        _id+=1;
        ImplementingPartnersList[_id]=addr;
    }

}
