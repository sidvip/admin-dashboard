import { Button, Offcanvas, PageItem } from "../../../node_modules/react-bootstrap/esm/index";
import { useEffect, useRef, useState } from "react";
import OffcanvasHeader from "../../../node_modules/react-bootstrap/esm/OffcanvasHeader";
import OffcanvasTitle from "../../../node_modules/react-bootstrap/esm/OffcanvasTitle";
import OffcanvasBody from "../../../node_modules/react-bootstrap/esm/OffcanvasBody";
import TopNavBar from "./nav-bar";
import LeftNavBar from "./left-side-navbar";
import { useDispatch, useSelector } from "react-redux";
import { selectUtility, setIsComposing, setSelectedMailCategory, setUnReadCount } from "../../redux/utility.slice";
import { Envelope, FileEarmark, GearFill, InboxFill, SunFill, TagFill, Trash } from "../../../node_modules/react-bootstrap-icons/dist/index";
import ComposeMail from "./compose";
import { NavLink, Outlet, useNavigate } from "../../../node_modules/react-router-dom/dist/index";
import DashboardToast from "../utility/toast";

export default function Dashboard() {

    const { leftNav, mail } = useSelector(selectUtility);
    const dispatch = useDispatch();

    const fieldsMap = {
        "Folders": [
            { icon: <InboxFill />, label: 'Inbox' },
            { icon: <Envelope />, label: 'Sent Mail' },
            { icon: <SunFill />, label: 'Important' },
            { icon: <FileEarmark />, label: 'Draft' },
            { icon: <Trash />, label: 'Trash' }
        ],
        "Categories": [
            { icon: <span className="w-3 h-3 rounded-full bg-[#00B493]"></span>, label: 'Work' },
            { icon: <span className="w-3 h-3 rounded-full bg-[#F2514D]"></span>, label: 'Documents' },
            { icon: <span className="w-3 h-3 rounded-full bg-[#0D83C8]"></span>, label: 'Social' },
            { icon: <span className="w-3 h-3 rounded-full bg-[#07C6C9]"></span>, label: 'Advertising' },
            { icon: <span className="w-3 h-3 rounded-full bg-[#F9AD50]"></span>, label: 'Clients' },
        ],
    };

    const labels = [
        { icon: <span className="flex gap-1 items-center border border-gray-700 bg-white p-1 text-xs cursor-pointer"> <TagFill /> Family</span> },
        { icon: <span className="flex gap-1 items-center border border-gray-700 bg-white p-1 text-xs cursor-pointer"> <TagFill /> Work</span> },
        { icon: <span className="flex gap-1 items-center border border-gray-700 bg-white p-1 text-xs cursor-pointer"> <TagFill /> Home</span> },
        { icon: <span className="flex gap-1 items-center border border-gray-700 bg-white p-1 text-xs cursor-pointer"> <TagFill /> Children</span> },
        { icon: <span className="flex gap-1 items-center border border-gray-700 bg-white p-1 text-xs cursor-pointer"> <TagFill /> Holidays</span> },
        { icon: <span className="flex gap-1 items-center border border-gray-700 bg-white p-1 text-xs cursor-pointer"> <TagFill /> Music</span> },
        { icon: <span className="flex gap-1 items-center border border-gray-700 bg-white p-1 text-xs cursor-pointer"> <TagFill /> Photography</span> },
        { icon: <span className="flex gap-1 items-center border border-gray-700 bg-white p-1 text-xs cursor-pointer"> <TagFill /> Film</span> },
    ];

    return (
        <div className="flex h-screen">
            <DashboardToast />
            <div className={`h-full duration-700 ease-in-out ${leftNav.open ? 'lg:w-[14%] md:w-[14%] w-[80px]' : 'w-[80px]'} `}>
                <LeftNavBar />
            </div>
            <div className="h-full flex-1 bg-[#F3F3F4] flex flex-col relative">
                <TopNavBar />
                <div className="absolute top-24 right-0 z-10">
                    <GearFill className="bg-[#00B493] rounded-bl-full rounded-tl-full w-10 h-8 p-[8px] text-white cursor-pointer" />
                </div>
                <div className="h-full flex-1 flex w-full overflow-auto">
                    <div className="w-[25%]  h-full p-12 overflow-auto">
                        <Button className="bg-[#00B493] border-none hover:bg-[#00B493] text-white border-r-0 w-full p-2 text-lg" onClick={() => {

                            dispatch(setIsComposing(true));
                        }}>Compose Mail</Button>
                        {
                            Object.keys(fieldsMap).map((k, i) => (
                                <div className="text-[#666A6C] pt-8" key={k + i}>
                                    <label className="font-semibold uppercase">{k}</label>
                                    <div className="flex flex-col pt-2">
                                        {
                                            fieldsMap[k].map((ele, idx) => (
                                                <NavLink to={ele.label.toLowerCase().replace(" ", "-")} className={({ isActive, isPending }) =>
                                                    isPending ? "pending" : isActive ? "text-[#00B493] font-bold" : ""
                                                } key={ele.label + idx}>
                                                    <label className="flex gap-2 items-center pb-1 pt-1 border-b border-gray-300 cursor-pointer" onClick={() => { dispatch(setSelectedMailCategory(ele.label.toLowerCase().replace(" ", "-"))) }}>
                                                        {ele.icon} {ele.label}
                                                    </label>
                                                </NavLink>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                        <div className="pt-10">
                            <label className="font-semibold pb-2 uppercase text-[#666A6C]">Labels</label>
                            <div className="flex gap-2 flex-wrap">
                                {labels.map((e, k) => <span key={'tag-' + k}>{e.icon}</span>)}
                            </div>
                        </div>
                    </div>
                    <div className=" grow-[4] h-full pt-8 pr-6 pb-6 h-full overflow-auto">
                        <Outlet />
                    </div>
                    {mail.composing ? <ComposeMail /> : null}
                </div>
            </div>
        </div>
    )
}