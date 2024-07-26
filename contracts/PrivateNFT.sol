// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721, ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateNFT is ERC721URIStorage, Ownable {
    uint256 private _currentTokenId;

    constructor(address initialOwner) ERC721("PrivateNFT", "PNFT") Ownable(initialOwner) {
        transferOwnership(initialOwner);
    }

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        _currentTokenId++;
        uint256 newItemId = _currentTokenId;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function burnNFT(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Only the owner can burn the NFT");
        _burn(tokenId);
    }
}
