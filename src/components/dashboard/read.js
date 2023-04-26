import { useSelector } from "react-redux";
import { useParams } from "../../../node_modules/react-router-dom/dist/index";
import { selectUtility } from "../../redux/utility.slice";
import { useEffect, useState } from "react";

export default function ReadMail() {

    const { mailId } = useParams();
    const { mail } = useSelector(selectUtility);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userInfo = userData[localStorage.getItem('email')];
    const [data, setData] = useState({ content: '', subject: '', time: '', sender: '', recipients: [''] });

    useEffect(() => {
        const list = userInfo[mail?.selectedCategory];
        setData(list?.filter((e) => e.id === Number(mailId))[0]);
        userInfo[mail.selectedCategory] = userInfo[mail.selectedCategory].map((_e) => {
            if (Number(mailId) === _e.id) {
                _e.read = true;
            }
            return _e;
        });
        userData[localStorage.getItem('email')] = userInfo;
        localStorage.setItem('userData', JSON.stringify(userData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className=" border h-full p-4">
            <span className="text-2xl font-bold">{data.subject}</span>
            <div className="text-md flex flex-col gap-2 justify-between ml-0 mr-2 mt-4 mb-4">
                <span><span className="font-bold">Sender:</span> {data.sender}</span>
                <span><span className="font-bold">Recipients:</span> {data.recipients.join(", ")}</span>
                <span><span className="font-bold">Time:</span> {data.time}</span>
            </div>
            <div className="mt-2 text-sm">
                {data.content}
            </div>
        </div>
    )
}