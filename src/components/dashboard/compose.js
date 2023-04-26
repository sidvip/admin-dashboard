import { useDispatch } from "react-redux";
import { Send, X } from "../../../node_modules/react-bootstrap-icons/dist/index";
import { Button } from "../../../node_modules/react-bootstrap/esm/index";
import { setIsComposing, showToast } from "../../redux/utility.slice";
import { useState } from "react";
import ExistingEmailsList from "./existing-email";
import formatTime from 'format-hours';


export default function ComposeMail() {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const userData = JSON.parse(localStorage.getItem('userData'));

    function checkAllElements(cc, emailList) {
        const existingEmails = [];
        const nonExistingEmails = [];

        for (let i = 0; i < cc.length; i++) {
            if (emailList.includes(cc[i])) {
                existingEmails.push(cc[i]);
            } else {
                nonExistingEmails.push(cc[i]);
            }
        }
        return [existingEmails, nonExistingEmails];
    }

    function sendEmail(e) {
        e.preventDefault();
        const to = e.currentTarget.elements[0].value;
        const cc = e.currentTarget.elements[1].value?.split(',').map(e => e.trim());
        const subject = e.currentTarget.elements[2].value;
        const body = e.currentTarget.elements[3].value;
        const emailList = Object.keys(userData);
        const ccEmailList = checkAllElements(cc, emailList);

        console.log(to, cc, subject, body, ccEmailList, emailList);
        if (!emailList.includes(to) || ccEmailList[1].length > 0) {
            dispatch(showToast({ data: { heading: 'Invalid email address', content: 'Enter a valid existing email address' }, show: true }));
            handleShow();
        } else {
            const recipientNamesList = [...ccEmailList[0], to].map((e) => userData[e].name);
            console.log(userData);
            userData[to]['inbox'].push(
                {
                    "sender": userData[localStorage.getItem('email')].name,
                    "subject": subject,
                    "content": body,
                    "time": formatTime(new Date(), { timeFormat: 'AM-PM', suffixes: [' AM', ' PM'] }),
                    "id": Math.round(Math.random() * 1000 + 120),
                    "recipients": recipientNamesList,
                    "read": false
                },
            )
            ccEmailList[0].filter(j => j !== to.trim()).forEach((_e) => {
                userData[_e]['inbox'].push(
                    {
                        "sender": userData[localStorage.getItem('email')].name,
                        "subject": subject,
                        "content": body,
                        "time": formatTime(new Date(), { timeFormat: 'AM-PM', suffixes: [' AM', ' PM'] }),
                        "id": Math.round(Math.random() * 1000 + 120),
                        "recipients": recipientNamesList,
                        "read": false
                    },
                )
            })
            userData[localStorage.getItem('email')]['sent-mail'].push({
                "sender": userData[localStorage.getItem('email')].name,
                "subject": subject,
                "content": body,
                "time": formatTime(new Date(), { timeFormat: 'AM-PM', suffixes: [' AM', ' PM'] }),
                "id": Math.round(Math.random() * 1000 + 120),
                "recipients": recipientNamesList,
                "read": true
            })
            localStorage.setItem('userData', JSON.stringify(userData));
        }
    }

    return (
        <form className="absolute bottom-5 right-5 w-[40%] rounded-md shadow-lg bg-white" onSubmit={sendEmail}>
            <header className="flex justify-between bg-[#00B493] p-2 rounded-md">
                <label>New Message</label>
                <X className="text-2xl cursor-pointer" onClick={() => {
                    dispatch(setIsComposing(false));
                }} />
            </header>
            <main>
                <div className="flex flex-col">
                    <input placeholder="To" className="text-md border-b p-2 outline-none" type="email" required />
                    <input placeholder="CC: Place email in comma separated format" className="text-md border-b p-2 outline-none" type="text" />
                    <input placeholder="Subject" className="text-md border-b p-2 outline-none" type="text" required />
                </div>
                <textarea className="w-full h-[500px] bg-slate-200 p-2 pb-0 resize-none outline-none" required />
                <Button className="flex bg-[#00B493] hover:bg-[#00B493] items-center gap-2 w-full justify-center" type="submit"><Send /> Send</Button>
            </main>
            <ExistingEmailsList show={show} handleClose={handleClose} />
        </form>
    )
}