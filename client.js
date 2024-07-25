const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  Transaction,
  TransactionInstruction,
  SystemProgram,
} = require("@solana/web3.js");
const fs = require("fs");

const PROGRAM_ID = new PublicKey("Gx4ZEQj7o1EdcH8TrDLCjLEKvmMDdf78qsr55yfRBy8S");

const main = async () => {
  // Load the keypair from the JSON file
  const keypairPath = "../../../my-solana-keypair.json";
  const keypairArray = JSON.parse(fs.readFileSync(keypairPath, "utf8"));
  const payer = Keypair.fromSecretKey(Uint8Array.from(keypairArray));

  // Establish a connection to the Solana testnet
  const connection = new Connection(clusterApiUrl("testnet"), "confirmed");

  console.log("Payer account:", payer.publicKey.toBase58());
  
  // Create a transaction instruction to invoke the contract
  const instruction = new TransactionInstruction({
    keys: [], // No specific accounts needed
    programId: PROGRAM_ID,
    data: Buffer.alloc(0), // No specific data needed
  });

  // Create a transaction to call the smart contract
  const transaction = new Transaction().add(instruction);

  // Send the transaction to the Solana network
  const signature = await connection.sendTransaction(transaction, [payer]);
  await connection.confirmTransaction(signature);

  console.log("Transaction sent to program:", PROGRAM_ID.toBase58());
};

main().catch((err) => {
  console.error(err);
});
