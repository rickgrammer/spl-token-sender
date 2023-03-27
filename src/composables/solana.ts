import {clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, Transaction} from "@solana/web3.js";
import {createTransferInstruction, getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID} from '@solana/spl-token'
import {Metaplex, keypairIdentity} from '@metaplex-foundation/js';
import {Metadata} from '@metaplex-foundation/mpl-token-metadata'
import state from '../store'
import {useToast} from "primevue/usetoast";

export interface Wallet {
  privateKey: string
  publicKey: string
}
// const toast = useToast()

export const connection = getSolanaConnection()

async function getOneToken(metaplex: Metaplex, account: any) {
  const parsedAccountInfo:any = account.account.data;
  const mintAddress:string = parsedAccountInfo["parsed"]["info"]["mint"];
  const token = await metaplex.nfts().findByMint({mintAddress: new PublicKey(mintAddress)})
  return {
    name: token.name,
    symbol: token.symbol,
    balance: parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"],
    decimals: parsedAccountInfo["parsed"]["info"]["tokenAmount"]["decimals"],
    mintAddress,
  }
}

export async function getAlltokens() {
  const wallet = state.wallet
  const metaplex = Metaplex.make(connection)
  const owner = wallet?.publicKey as PublicKey
  metaplex.use(keypairIdentity(wallet as Keypair))

  const accounts = await connection.getParsedTokenAccountsByOwner(owner, {
    programId: TOKEN_PROGRAM_ID
  })
  let result = await Promise.allSettled(accounts.value.map(account => getOneToken(metaplex, account)))
  result = (result.filter(x => x.status === 'fulfilled') as PromiseFulfilledResult<any>[]).map(x => x.value)
  state.coins = result
}

function getSolanaConnection() {
  const connection = new Connection(clusterApiUrl('devnet'), "confirmed")
  return connection
}

export async function sendCoin(to: string, amount: number, mintAdress: string) {
  const signer = {
      publicKey: state.wallet?.publicKey as PublicKey,
      secretKey: state.wallet?.secretKey as Uint8Array,
    }
  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection, signer, new PublicKey(mintAdress), state.wallet?.publicKey as PublicKey)
  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection, signer, new PublicKey(mintAdress), new PublicKey(to)
  )
  const transaction = new Transaction().add(
    createTransferInstruction(
      fromTokenAccount.address,
      toTokenAccount.address,
      state.wallet?.publicKey as PublicKey,
      amount,
      [],
      TOKEN_PROGRAM_ID
    )
  )
  const tx = await sendAndConfirmTransaction(connection, transaction, [signer])
}


