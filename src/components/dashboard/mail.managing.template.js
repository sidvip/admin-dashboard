import { useDispatch, useSelector } from "react-redux";
import { ArrowClockwise, ArrowLeft, ArrowRight, ExclamationCircle, Eye, Trash } from "../../../node_modules/react-bootstrap-icons/dist/index";
import { Button, FormControl } from "../../../node_modules/react-bootstrap/esm/index";
import { selectUtility, showToast } from "../../redux/utility.slice";
import { Link } from "../../../node_modules/react-router-dom/dist/index";
import { useState } from "react";


export default function MailManagingTemplate() {

    const TEMPLATES = {
        inbox: {
            label: 'Inbox',
        },
        "sent-mail": {
            label: 'Sent Mail'
        },
        trash: {
            label: 'Trash'
        }
    };

    const [selectedEmailsId, setSelectedEmailIds] = useState([]);
    const [isRefreshed, setRefreshed] = useState(false);
    const dispatch = useDispatch();
    const { mail } = useSelector(selectUtility);
    const userInfo = JSON.parse(localStorage.getItem('userData'))[localStorage.getItem('email')];
    return (
        <div className="bg-white shadow-md flex flex-col h-full">
            <div className="p-4">
                <div className="flex justify-between">
                    <label className="text-2xl ">{TEMPLATES[mail.selectedCategory]?.label} ({JSON.parse(localStorage.getItem('userData'))[localStorage.getItem('email')][mail?.selectedCategory]?.length || 0})</label>
                    <div className="flex gap-1">
                        <FormControl
                            className="w-72 border-r-none focus:outline-none focus:border-none"
                            placeholder="Search email"
                        />
                        <Button className="bg-[#00B493] border-none hover:bg-[#00B493]">Search</Button>
                    </div>
                </div>
                <div className="mt-3 flex justify-between">
                    <div className="flex gap-2">
                        <Button className="border text-gray-500 hover:bg-white hover:text-gray-500 flex items-center gap-1 text-sm" onClick={() => setRefreshed(!isRefreshed)}><ArrowClockwise /> Refresh</Button>
                        <Button className="border text-gray-500 hover:bg-white hover:text-gray-500 flex items-center gap-1 text-sm"><Eye /></Button>
                        <Button className="border text-gray-500 hover:bg-white hover:text-gray-500 flex items-center gap-1 text-sm"><ExclamationCircle /></Button>
                        <Button className="border text-gray-500 hover:bg-white hover:text-gray-500 flex items-center gap-1 text-sm" onClick={() => {
                            const userData = JSON.parse(localStorage.getItem('userData'));
                            const userInfo = userData[localStorage.getItem('email')];
                            userInfo['trash'] = [...userInfo['trash'], ...userInfo[mail.selectedCategory].filter((e_) => selectedEmailsId.includes(e_.id))];
                            userInfo[mail.selectedCategory] = userInfo[mail.selectedCategory].filter((e_) => !selectedEmailsId.includes(e_.id));
                            userData[localStorage.getItem('email')] = userInfo;
                            localStorage.setItem('userData', JSON.stringify(userData));
                            dispatch(showToast({ data: { heading: "Mail Deletion", content: "Mail deleted successfully" }, show: true }));
                            setRefreshed(!isRefreshed);
                        }}><Trash /></Button>
                    </div>
                    <div className="flex gap-1">
                        <Button className="border text-gray-500 hover:bg-white hover:text-gray-500 flex items-center gap-1 font-bold"><ArrowLeft /></Button>
                        <Button className="border text-gray-500 hover:bg-white hover:text-gray-500 flex items-center gap-1 text-sm"><ArrowRight /></Button>
                    </div>
                </div>
            </div>
            <div className="mt-3 flex-1 border-t border-gray-200 overflow-auto pb-2">
                {
                    mail.selectedCategory && userInfo[mail.selectedCategory].length === 0 ?
                        <section className="flex justify-center items-cente text-2xl mt-4 text-red-300 font-bold">
                            No Emails found
                        </section> : null
                }
                {
                    mail.selectedCategory && (userInfo[mail.selectedCategory]).reverse().map((_e, _i) => (
                        <Link to={`/read/${_e.id}`} key={_e.id}>
                            <section className="flex items-center h-14 p-4 border-b border-gray-200 hover:bg-slate-100 cursor-pointer" style={{ backgroundColor: !_e.read ? '#F9F8F8' : '' }}>
                                <div className="flex items-center grow-[1] w-14 gap-3">
                                    <input type="checkbox" className="w-6 h-6" onClick={(e) => {
                                        e.currentTarget.checked ? setSelectedEmailIds([...selectedEmailsId, _e.id]) : setSelectedEmailIds(selectedEmailsId.filter(p => p.id === _e.id));
                                        e.stopPropagation();
                                    }} />
                                    <label style={{ fontWeight: _e.read ? "light" : "bold" }}>{_e.sender}</label>
                                </div>
                                <label className={"grow-[6]"} style={{ fontWeight: _e.read ? "light" : "bold" }}>{_e.subject}</label>
                                <label className="grow-0" style={{ fontWeight: _e.read ? "light" : "bold" }}>{_e.time}</label>
                            </section>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}