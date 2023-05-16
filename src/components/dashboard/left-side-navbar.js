import { useDispatch, useSelector } from "react-redux";
import { BarChart, BookFill, CardChecklist, CaretDown, CaretDownFill, CaretLeft, Diamond, Display, EnvelopeFill, Laptop, PieChart } from "react-bootstrap-icons";
import { selectUtility, setIsComposing } from "../../redux/utility.slice";
import { useState } from "react";
import { NavLink } from "react-router-dom";
export default function LeftNavBar() {

    const { leftNav } = useSelector(selectUtility);
    const dispatch = useDispatch();
    const userDetails = JSON.parse(localStorage.getItem('userData'))[localStorage.getItem('email')];
    const [isOpen, setOpen] = useState({
        dashboard: false,
        diamond: false,
        envelope: false,
        barchart: false,
    });

    const subMenu = {
        dashboard: ['Admin', 'User', 'Generic'],
        envelope: ['Inbox', 'Email View', 'Email templates'],
        diamond: ['Normal', 'Advanced'],
        barchart: ['Shares', 'Performance'],
    };

    const leftNavIcons = {
        dashboard: [<Display />, 'Dashboard'],
        diamond: [<Diamond />, 'Layouts'],
        envelope: [<EnvelopeFill />, 'Mailbox'],
        barchart: [<BarChart />, 'Graphs'],
        pie: [<PieChart />, 'Metrics'],
        book: [<BookFill />, 'Widgets'],
        laptop: [<Laptop />, 'App Views'],
        card: [<CardChecklist />, 'Forms'],
    };

    return (
        leftNav.open ?
            <div className="text-white flex flex-col h-full bg-[#2E3F50]">
                <div className="flex flex-col p-10 pl-5 justify-start bg-[#233645]">
                    <img alt='profile-img' src={userDetails.profile_url} className="rounded-full w-20 h-20 p-2" />
                    <label className="font-bold">{userDetails.name}</label>
                    <label className="text-gray-400 font-light text-sm flex gap-1 items-center">{userDetails.designation}<CaretDownFill className="cursor-pointer" /></label>
                </div>

                <div className="text-gray-400 font-bold flex flex-col gap-2 flex-1 h-full overflow-auto pb-5">
                    {
                        Object.keys(leftNavIcons).map((key, idx) => (
                            <div key={key} className="flex flex-col cursor-pointer justify-start pl-10 p-3 hover:bg-[#1d242a] hover:border-l-4 hover:border-sky-500">
                                <div className="flex justify-start items-center gap-2">
                                    {leftNavIcons[key][0]}
                                    <label className={"cursor-pointer flex gap-1 items-center " + (isOpen[key] ? "text-white" : "")}>
                                        {leftNavIcons[key][1]}
                                        {isOpen[key] !== undefined ?
                                            (isOpen[key] ? <CaretDown size={12} onClick={() => { setOpen({ ...isOpen, [key]: false }); }} /> : <CaretLeft size={12} onClick={() => { setOpen({ ...isOpen, [key]: true }); }} />) : null}
                                    </label>
                                </div>
                                {isOpen[key] ?
                                    <div className="flex flex-col pl-8 transition-all">
                                        {
                                            Object.keys(subMenu).map((k, idx) => (
                                                k === key ?
                                                    subMenu[k].map((el, i) =>

                                                        <NavLink to={el.toLowerCase().replace(" ", "-")} className={({ isActive, isPending }) =>
                                                            isPending ? "pending" : isActive ? "text-white font-bold" : ""
                                                        }>
                                                            <label className="p-2 cursor-pointer hover:text-white" onClick={el === 'Compose Email' ? () => { dispatch(setIsComposing(true)) } : null}>{el}</label>
                                                        </NavLink>
                                                    ) : null
                                            ))
                                        }
                                    </div> : null}
                            </div>
                        ))
                    }
                </div>
            </div >
            :
            <div className="bg-[#2E3F50] h-full">
                <div className="flex flex-col h-full text-white">
                    <div className="h-[80px] bg-[#273A4A] flex justify-center items-center text-2xl font-bold">
                        <label>IN+</label>
                    </div>
                    <div className="flex flex-col gap-2 text-xl pb-2 pt-2 flex-1 overflow-auto">
                        {
                            Object.keys(leftNavIcons).map((key, idx) =>
                                <div className="cursor-pointer h-[60px] w-full flex justify-center items-center hover:bg-[#1d242a] hover:border-l-4 hover:border-sky-500" key={key}>
                                    {leftNavIcons[key][0]}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div >
    )
}