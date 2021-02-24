const middy = require("middy");
const { cors } = require("middy/middlewares");
const config = require("./config");
const { ethers, utils } = require("ethers");

const handleFaucet = async (event, _context, callback) => {
  console.log("got here 4")
    // const provider = ethers.getDefaultProvider("ropsten");
    const provider = new ethers.providers.InfuraProvider("ropsten");
    
    // step 1: handle the request, extract the target wallet address
    // const receiver = event.pathParameters.walletAddress; // TODO: validate wallet address
    const receiver = "0x709731d94D65b078496937655582401157c8A640";
    console.log(await provider.getBalance(receiver))

    if (!utils.isAddress(receiver)) {
      throw new Error("Invalid wallet address");
    } else {
      console.log("gothere 3")
      // step 2: unlock /your own wallet/ -- wallet private key should be provided in env var
      const privateKey = process.env.FAUCET_PRIVATE_KEY;
      const sender = new ethers.Wallet(privateKey, provider);

      // provider.getBalance(sender.address).then((balance) => {
      //   console.log("BALANCE: " + balance);
      // })

      console.log("gothere 2")
      // const balance = await sender.getBalance();
      console.log(sender.address);
      const balance2 = await provider.getBalance(sender.address);
      //0x3bd20c2493d07b2622455210ecdefe10e0713154
      console.log(balance2);
      // console.log(sender.getBalance());
      // sender.getBalance().then((balance) => {
      //   console.log("BALANCE: " + balance);
      // })
      

      // const balance = sender.getBalance().then((balance) => {
      //   console.log(balance);
      // })
      // balance.then((balance) => {
      //   console.log(balance);
      // });

      // step 3: transfer 1 eth to the target wallet address
      const transaction = {
        to: receiver,
        value: 1,
        value: utils.parseEther("1"),
      };

      console.log("got here")

      // const result = await sender.sendTransaction(transaction);
      // console.log(result);
      // step 4: send successful response
      callback(null, {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"response": "OK"})
      });

    }
    
  // } catch (e) {
  //   callback(null, {
  //     statusCode: 400,
  //     body: e.message
  //   });
  // }
};

const handler = middy(handleFaucet).use(cors());

module.exports = {
  handler
};
