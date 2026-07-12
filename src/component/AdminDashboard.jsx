import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { QRCodeCanvas } from "qrcode.react";

const AdminDashboard = () => {
    const [issues, setIssues] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]); 

    useEffect(() => {
        getIssues();
    }, []);

    async function getIssues() {
        try {
            const snapshot = await getDocs(collection(db, "Issue"));
            let data = [];
            snapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            setIssues(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Kya aap waqai is issue ko delete karna chahte hain?");
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, "Issue", id));
            setIssues(issues.filter((issue) => issue.id !== id));
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
            alert("Issue kamyabi se delete ho gaya!");
        } catch (error) {
            console.error("Delete karne mein error aaya: ", error);
        }
    };

    const handleSelectCard = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleSelectAll = () => {
        if (selectedIds.length === issues.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(issues.map(issue => issue.id));
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f5f7] flex font-sans antialiased text-gray-800">
            
            {/* 1. SIDEBAR */}
            <aside className="w-64 bg-[#0a56d2] text-white flex flex-col justify-between p-5 hidden md:flex shrink-0">
                <div>
                    <div className="flex items-center gap-3 mb-8 px-2">
                        <div className="bg-white p-1.5 rounded-lg text-[#0a56d2] font-bold text-xl">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zm3 3a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H9a1 1 0 01-1-1V9zm2 2v-1H9v1h1zm3-7a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v-1h-1v1h1zm-8 7a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1H5v1h1z" clipRule="evenodd"></path></svg>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg leading-tight">MaintainIQ</h2>
                            <span className="text-xs text-blue-200">Asset Management</span>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        <a href="#dash" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-sm font-medium transition-colors">Dashboard</a>
                        <a href="#assets" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-sm font-medium transition-colors">Assets</a>
                        <a href="#qr" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/15 text-sm font-bold transition-colors">QR Codes</a>
                        <a href="#issues" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-sm font-medium transition-colors">Issues</a>
                        <a href="#tech" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-sm font-medium transition-colors">Technicians</a>
                        <a href="#analytics" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-sm font-medium transition-colors">Analytics</a>
                        <a href="#history" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-sm font-medium transition-colors">Asset History</a>
                        <a href="#search" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-sm font-medium transition-colors">Search</a>
                    </nav>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">AU</div>
                    <div>
                        <p className="text-sm font-semibold leading-tight">Admin User</p>
                        <span className="text-xs text-blue-200">Super Admin</span>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto pb-24">
                
                {/* 2. TOP BAR */}
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between gap-4 shrink-0">
                    <div className="relative w-full max-w-md">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </span>
                        <input type="text" placeholder="Search assets..." className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div className="flex items-center gap-4 text-gray-500 shrink-0">
                        <button className="hover:text-gray-700"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg></button>
                        <button className="hover:text-gray-700"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></button>
                        <div className="h-5 w-[1px] bg-gray-200"></div>
                        <span className="text-xs font-semibold text-gray-600 bg-gray-100 border px-2.5 py-1 rounded-md">MaintainIQ Cloud</span>
                    </div>
                </header>

                {/* 3. DASHBOARD TITLE HEADER */}
                <div className="px-8 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">QR Generation</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Create and manage physical tracking labels for your assets.</p>
                    </div>
                    <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        Generate Bulk QR Labels
                    </button>
                </div>

                {/* 4. FILTER SUB-BAR */}
                <div className="mx-8 mt-6 bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 font-semibold text-gray-700 cursor-pointer">
                            <input type="checkbox" checked={selectedIds.length === issues.length && issues.length > 0} onChange={handleSelectAll} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            Select All
                        </label>
                        <span className="text-gray-400">|</span>
                        <p className="text-gray-600 font-medium">Category: <span className="font-bold text-gray-800">All Categories</span></p>
                    </div>
                    <span className="text-gray-500 font-medium">Showing {issues.length} of {issues.length} assets</span>
                </div>

                {/* 5. WHITE GRID LAYOUT */}
                <div className="px-8 mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                        issues.map((issue) => {
                            const isSelected = selectedIds.includes(issue.id);
                            return (
                                <div
                                    key={issue.id}
                                    className={`bg-white border-2 ${isSelected ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'} rounded-xl p-4 flex flex-col justify-between shadow-sm relative group hover:shadow-md transition-all duration-200`}
                                >
                                    {/* Top Metadata Row */}
                                    <div className="flex justify-between items-start mb-2">
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => handleSelectCard(issue.id)}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer mt-0.5"
                                        />
                                        
                                        {/* Dynamic Status Tag */}
                                        <span className={`text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded uppercase ${
                                            issue.WorkerName ? 'bg-orange-100 text-orange-700 border border-orange-200' : 'bg-green-100 text-green-700 border border-green-200'
                                        }`}>
                                            {issue.WorkerName ? 'Warning' : 'Operational'}
                                        </span>
                                    </div>

                                    {/* Text Information Section (High Visibility) */}
                                    <div className="text-center mb-4">
                                        <h3 className="text-base font-extrabold text-gray-900 tracking-tight break-words px-1 line-clamp-1">
                                            {issue.Tital || "Asset Component"}
                                        </h3>
                                        <span className="text-[11px] font-mono font-bold text-gray-500 tracking-wider block mt-1 uppercase">
                                            ID-{issue.id.substring(0, 6)}
                                        </span>
                                    </div>

                                    {/* QR Code Canvas Frame */}
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-center items-center mb-4 min-h-[170px]">
                                        <QRCodeCanvas
                                            value={`${window.location.origin}/showdata/${issue.id}`}
                                            size={120}
                                            bgColor={"#ffffff"}
                                            fgColor={"#1f2937"}
                                        />
                                    </div>

                                    {/* Labels Tags - Yahan 'Facility' ki jagah 'Worker:' likha hai */}
                                    <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                                        <span className="text-[11px] bg-gray-100 text-gray-800 font-bold px-2 py-0.5 rounded border border-gray-300">
                                            Worker:
                                        </span>
                                        {issue.WorkerName ? (
                                            <span className="text-[11px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-200 truncate max-w-[100px]">
                                                {issue.WorkerName}
                                            </span>
                                        ) : (
                                            <span className="text-[11px] bg-gray-50 text-gray-500 italic px-2 py-0.5 rounded border border-gray-200">
                                                Not Assigned
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Links */}
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-gray-500">
                                        <button onClick={() => handleDelete(issue.id)} className="hover:text-red-600 transition-colors p-1" title="Delete Asset">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                        <button className="hover:text-blue-600 transition-colors p-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                                        </button>
                                        <a href={`${window.location.origin}/showdata/${issue.id}`} target="_blank" rel="noreferrer" className="text-[11px] text-blue-600 font-extrabold hover:underline flex items-center gap-0.5">
                                            Open Public Page
                                        </a>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>

                {/* 6. BOTTOM FLOATING ACTION BAR */}
                {selectedIds.length > 0 && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-[calc(50%+128px)] bg-[#1e293b] text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-8 z-50 w-[90%] max-w-2xl border border-gray-700/50 justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 p-2 rounded-lg text-white">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                            </div>
                            <div>
                                <p className="text-xs font-bold">{selectedIds.length} assets selected</p>
                                <span className="text-[10px] text-gray-400">Ready for bulk label generation</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setSelectedIds([])} className="text-xs font-bold text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 px-4 py-2 rounded-lg transition-colors">
                                Clear Selection
                            </button>
                            <button onClick={() => alert(`Bulk Action triggered.`)} className="text-xs font-bold bg-[#0a56d2] hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors shadow-sm">
                                Generate Bulk Label Sheet
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;