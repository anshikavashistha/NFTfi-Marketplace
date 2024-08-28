// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTfiMarketplace is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    struct FinancialNFT {
        uint256 tokenId;
        string financialContract;
        address owner;
    }

    mapping(uint256 => FinancialNFT> public financialNFTs;

    constructor() ERC721("FinancialNFT", "FNFT") {
        tokenCounter = 0;
    }

    function createFinancialNFT(string memory financialContract, string memory tokenURI) public onlyOwner {
        uint256 tokenId = tokenCounter;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        FinancialNFT memory newNFT = FinancialNFT({
            tokenId: tokenId,
            financialContract: financialContract,
            owner: msg.sender
        });

        financialNFTs[tokenId] = newNFT;

        tokenCounter++;
    }

    function transferNFT(address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of this NFT");
        _transfer(msg.sender, to, tokenId);
        financialNFTs[tokenId].owner = to;
    }
}
