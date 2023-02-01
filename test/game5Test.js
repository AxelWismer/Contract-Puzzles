const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    let signer = ethers.provider.getSigner(0);
    let wallet;
    
    // look for a wallet whose address match the contract requirements
    do  {
      wallet = ethers.Wallet.createRandom().connect(ethers.provider);
    } while (wallet.address.slice(0,5) >= '0x00F')
    
    // Send funds
    await signer.sendTransaction({to: wallet.address, value: ethers.utils.parseEther("1")});
    return { game, wallet };
  }
  
  it('should be a winner', async function () {
    const { game, wallet } = await loadFixture(deployContractAndSetVariables);

    // good luck
    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
