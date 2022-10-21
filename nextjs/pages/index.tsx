import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import Grid from '../components/Grid';

const TEST_GIFS = [
  'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
  'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
  'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
  'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp',
]


const Home: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState<string[]>([]);

  const checkIfWalletIsConnected = async () => {
    // We're using optional chaining (question mark) to check if the object is null
    if (window?.solana?.isPhantom) {
      console.log('Phantom wallet found!');
      const response = await window.solana.connect({ onlyIfTrusted: true });
      console.log(
        'Connected with Public Key:',
        response.publicKey.toString()
      );
      setWalletAddress(response.publicKey.toString());
    } else {
      alert('Solana object not found! Get a Phantom Wallet 👻');
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const onInputChange = (event: any) => {
    const { value } = event.target;
    setInputValue(value);
  }

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log('Gif link:', inputValue);
      setGifList([...gifList, inputValue]);
      setInputValue('');
    } else {
      console.log('Empty input. Try again.');
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="bg-black p-5 rounded-full font-bold text-l"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const renderConnectedContainer = () => (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendGif();
        }}
        className="flex gap-10"
      >
        <input type="text" placeholder="Enter gif link!" value={inputValue} onChange={onInputChange} className="bg-white border-4 px-2 py-1 flex-1 border-gray-500 rounded-lg text-gray-500" />
        <button type="submit" className="bg-pink-400 rounded-lg px-4 py-2 border-4 border-white text-white font-bold">Submit</button>
      </form>
      <Grid gifs={gifList} />
    </div>
  );

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list...');

      // Call Solana program here.

      // Set state
      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);

  return (
    <div className='flex flex-col items-center justify-center gap-10 lg:gap-20 font-sans bg-blue-900 text-white'>
      <h1 className='text-4xl lg:text-8xl font-bold mt-52'>🖼 Funny GIF Portal</h1>
      <p className='text-l lg:text-3xl'>View your GIF collection in the metaverse ✨</p>
      {!walletAddress && renderNotConnectedContainer()}
      {walletAddress && renderConnectedContainer()}
    </div>
  )
}

export default Home
