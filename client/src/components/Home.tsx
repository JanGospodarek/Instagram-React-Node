import img from '../img/insta-wall.jpg';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const nav = useNavigate();
  return (
    <div
      className={`w-full h-full bg-[url('https://colordodge.com/wp-content/uploads/2013/12/instagram4-1024x593.jpg')]`}
    >
      <div
        className='hero min-h-screen '
        style={{
          background:
            'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7287289915966386) 48%, rgba(255,255,255,0) 100%) ',
        }}
      >
        <div className='hero-content text-center bg-transparent p-16  '>
          <div className='max-w-md'>
            <h1 className='text-8xl font-bold mb-10 text-white '>Instagram</h1>
            <button
              className='btn btn-outline btn-secondary m-4'
              onClick={() => nav('/login')}
            >
              Log in
            </button>
            <button
              className='btn btn-outline btn-secondary m-4'
              onClick={() => nav('/register')}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
