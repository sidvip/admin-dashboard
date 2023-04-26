import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default function NotFoundPage() {

    const navigate = useNavigate();

    return (
        <div className='flex h-screen justify-center items-center flex-col gap-4 bg-zinc-800 text-white'>
            <h1 className='text-5xl'>Page Not Found ! 🥲</h1>
            <h2 className='text-2xl'>
                Please go back 👈 to
                <Button variant="link" onClick={() => {
                    navigate('/');
                }}>
                    Link
                </Button>
            </h2>
        </div>
    )
}