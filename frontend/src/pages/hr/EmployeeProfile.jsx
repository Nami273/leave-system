import { useState, useRef } from "react"
import { PenLine, Trash2, UserCog, Mail, Phone, MapPin, Briefcase, Calendar as CalendarIcon, Umbrella, Users, Thermometer, Folder, X, Check, Shield, Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"

export default function EmployeeProfile({ onNavigate }) {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const adminNavItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "employee", label: "Employee" },
    { id: "reports", label: "Reports" },
    { id: "leave-type", label: "Leave Type" }
  ]

  const adminProfile = {
    name: "HR",
    role: "Global HR Manager"
  }

  // Profile picture state
  const [profileImg, setProfileImg] = useState("https://i.pravatar.cc/250?img=11")

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAccessModal, setShowAccessModal] = useState(false)

  // Leave quotas state
  const [leaveQuotas, setLeaveQuotas] = useState({
    sick: { used: 2, total: 10 },
    personal: { used: 5, total: 5 },
    annual: { used: 14, total: 25 }
  })

  // Edit leave state
  const [editingLeave, setEditingLeave] = useState(null) // 'sick' | 'personal' | 'annual' | null
  const [editValue, setEditValue] = useState('')

  // Access settings state
  const [accessSettings, setAccessSettings] = useState({
    role: 'Employee',
    canApprove: false,
    canViewReports: false,
    isActive: true
  })

  const [showAllActivities, setShowAllActivities] = useState(false)

  const allActivities = [
    { id: 1, type: "Annual Leave", date: "Applied on Oct 12 • 5 Days", status: "Approved", icon: "annual" },
    { id: 2, type: "Personal Leave", date: "Applied on Sep 05 • 1 Day", status: "Approved", icon: "personal" },
    { id: 3, type: "Sick Leave", date: "Applied on Aug 21 • 2 Days", status: "Rejected", icon: "sick" },
    { id: 4, type: "Annual Leave", date: "Applied on Jul 10 • 3 Days", status: "Approved", icon: "annual" },
    { id: 5, type: "Sick Leave", date: "Applied on Jun 18 • 1 Day", status: "Approved", icon: "sick" },
    { id: 6, type: "Personal Leave", date: "Applied on May 02 • 2 Days", status: "Rejected", icon: "personal" },
  ]

  const displayedActivities = showAllActivities ? allActivities : allActivities.slice(0, 3)

  const statusStyles = {
    Approved: { bg: "#0cf1aa", text: "#185b48" },
    Rejected: { bg: "#f56464", text: "#570008" }
  }

  const iconData = {
    annual: { Icon: Umbrella, color: "#1982c4", bg: "#e6f2fb" },
    personal: { Icon: Users, color: "#d06ab0", bg: "#f8e0f0" },
    sick: { Icon: Thermometer, color: "#f57a00", bg: "#fff2e5" }
  }

  // Handlers
  const handleDeleteEmployee = () => {
    setShowDeleteModal(false)
    navigate('/hr/employee')
  }

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImg(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const startEditLeave = (type) => {
    setEditingLeave(type)
    setEditValue(String(leaveQuotas[type].total))
  }

  const saveEditLeave = () => {
    if (editingLeave && editValue) {
      const newTotal = parseInt(editValue) || leaveQuotas[editingLeave].total
      setLeaveQuotas(prev => ({
        ...prev,
        [editingLeave]: { ...prev[editingLeave], total: newTotal }
      }))
    }
    setEditingLeave(null)
    setEditValue('')
  }

  const cancelEditLeave = () => {
    setEditingLeave(null)
    setEditValue('')
  }

  const pad = (n) => String(n).padStart(2, '0')

  const getBarWidth = (used, total) => {
    if (total === 0) return '0%'
    return `${Math.min((used / total) * 100, 100)}%`
  }

  return (
    <div className="min-h-screen bg-[#eef2f9] flex flex-col font-nunito">
      <Header
        activePage="employee"
        onNavigate={onNavigate}
        navItems={adminNavItems}
        user={adminProfile}
      />

      {/* Hidden file input for profile pic */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleProfilePicChange}
      />

      <main className="max-w-6xl mx-auto px-6 py-12 w-full flex-grow">

        {/* Top Profile Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div className="flex gap-8 group relative">
            <div className="relative">
              <img src={profileImg} alt="Somchai" className="w-40 h-40 object-cover rounded-[32px] border-4 border-white shadow-sm" />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 bg-white rounded-full p-2.5 shadow-md text-[#64748b] hover:text-[#3f4a51] transition-colors border border-gray-50"
              >
                <PenLine size={18} />
              </button>
            </div>
            <div className="flex flex-col justify-center pt-2">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-[44px] font-fredoka font-bold text-[#323940] m-0 leading-none">Somchai</h1>
                <span className="bg-[#bfeadd] text-[#3b6661] px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-widest self-start mt-1">Active</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[#64748b] font-medium text-[15px]">
                  <Briefcase size={18} /> Dev / Software Engineer
                </div>
                <div className="flex items-center gap-3 text-[#64748b] font-medium text-[15px]">
                  <CalendarIcon size={18} /> Start Date: Jan 15, 2022
                </div>
                <div className="flex items-center gap-3 text-[#64748b] font-medium text-[15px]">
                  <MapPin size={18} /> Bangkok Hub
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="!bg-[#ff6b6b] hover:bg-[#fa5a5a] text-white rounded-[20px] !px-6 !py-4 flex items-center gap-3 font-bold text-[16px] shadow-sm transition-colors w-40 justify-center leading-tight"
            >
              <Trash2 size={20} />
              Delete<br />Employee
            </button>
            <button
              onClick={() => setShowAccessModal(true)}
              className="!bg-[#757d7b] hover:bg-[#656d6b] text-white rounded-[20px] !px-6 !py-4 flex items-center gap-3 font-bold text-[16px] shadow-sm transition-colors w-44 justify-center leading-tight"
            >
              <UserCog size={20} />
              Manage<br />Access
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">

          {/* Left Column (Leave Quotas & Recent Activity) */}
          <div className="flex flex-col gap-8">

            {/* Leave Balance Cards */}
            <div className="grid grid-cols-3 gap-6">
              {/* Sick Leave */}
              <div className="bg-[#ffca7a] rounded-[40px] p-6 shadow-sm relative overflow-hidden aspect-[4/5] flex flex-col justify-center">
                {editingLeave === 'sick' ? (
                  <div className="absolute top-5 right-5 flex gap-1.5 z-10">
                    <button onClick={saveEditLeave} className="w-7 h-7 bg-white/60 rounded-full flex items-center justify-center text-[#2c7356] hover:bg-white/80 transition-colors"><Check size={14} /></button>
                    <button onClick={cancelEditLeave} className="w-7 h-7 bg-white/60 rounded-full flex items-center justify-center text-[#855913] hover:bg-white/80 transition-colors"><X size={14} /></button>
                  </div>
                ) : (
                  <button onClick={() => startEditLeave('sick')} className="absolute top-6 right-6 w-8 h-8 bg-white/40 rounded-full flex items-center justify-center text-[#966518] hover:bg-white/60 transition-colors">
                    <PenLine size={14} />
                  </button>
                )}
                <Thermometer className="absolute bottom-4 right-4 w-28 h-28 text-[#e0a446] opacity-30 -rotate-12" />
                <div className="relative z-[1] px-2 mb-2">
                  <h3 className="font-bold text-[17px] font-fredoka text-[#855913] mb-4">Sick Leave</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-[64px] font-fredoka font-bold text-[#855913] leading-none">{pad(leaveQuotas.sick.used)}</span>
                    <span className="text-[18px] font-bold text-[#855913] opacity-80">
                      / {editingLeave === 'sick' ? (
                        <input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && saveEditLeave()}
                          className="w-12 bg-white/60 rounded-lg px-2 py-0.5 text-[16px] font-bold text-[#855913] outline-none text-center"
                          autoFocus
                        />
                      ) : `${leaveQuotas.sick.total}days`}
                    </span>
                  </div>
                  <div className="w-full bg-[#e0a446] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#855913] h-full rounded-full transition-all" style={{ width: getBarWidth(leaveQuotas.sick.used, leaveQuotas.sick.total) }}></div>
                  </div>
                </div>
              </div>

              {/* Personal Days */}
              <div className="bg-[#ff9bc9] rounded-[40px] p-6 shadow-sm relative overflow-hidden aspect-[4/5] flex flex-col justify-center">
                {editingLeave === 'personal' ? (
                  <div className="absolute top-5 right-5 flex gap-1.5 z-10">
                    <button onClick={saveEditLeave} className="w-7 h-7 bg-white/60 rounded-full flex items-center justify-center text-[#2c7356] hover:bg-white/80 transition-colors"><Check size={14} /></button>
                    <button onClick={cancelEditLeave} className="w-7 h-7 bg-white/60 rounded-full flex items-center justify-center text-[#8e3966] hover:bg-white/80 transition-colors"><X size={14} /></button>
                  </div>
                ) : (
                  <button onClick={() => startEditLeave('personal')} className="absolute top-6 right-6 w-8 h-8 bg-white/40 rounded-full flex items-center justify-center text-[#8e3966] hover:bg-white/60 transition-colors">
                    <PenLine size={14} />
                  </button>
                )}
                <Users className="absolute bottom-4 right-4 w-32 h-32 text-[#d470a1] opacity-30 -rotate-12" strokeWidth={2} />
                <div className="relative z-10 px-2 mb-2">
                  <h3 className="font-bold text-[17px] font-fredoka text-[#8e3966] mb-4">Personal Days</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-[64px] font-fredoka font-bold text-[#8e3966] leading-none">{pad(leaveQuotas.personal.used)}</span>
                    <span className="text-[18px] font-bold text-[#8e3966] opacity-80">
                      / {editingLeave === 'personal' ? (
                        <input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && saveEditLeave()}
                          className="w-12 bg-white/60 rounded-lg px-2 py-0.5 text-[16px] font-bold text-[#8e3966] outline-none text-center"
                          autoFocus
                        />
                      ) : `${leaveQuotas.personal.total}days`}
                    </span>
                  </div>
                  <div className="w-full bg-[#d470a1] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#8e3966] h-full rounded-full transition-all" style={{ width: getBarWidth(leaveQuotas.personal.used, leaveQuotas.personal.total) }}></div>
                  </div>
                </div>
              </div>

              {/* Annual Leave */}
              <div className="bg-[#9cd5ff] rounded-[40px] p-6 shadow-sm relative overflow-hidden aspect-[4/5] flex flex-col justify-center">
                {editingLeave === 'annual' ? (
                  <div className="absolute top-5 right-5 flex gap-1.5 z-10">
                    <button onClick={saveEditLeave} className="w-7 h-7 bg-white/60 rounded-full flex items-center justify-center text-[#2c7356] hover:bg-white/80 transition-colors"><Check size={14} /></button>
                    <button onClick={cancelEditLeave} className="w-7 h-7 bg-white/60 rounded-full flex items-center justify-center text-[#2a6896] hover:bg-white/80 transition-colors"><X size={14} /></button>
                  </div>
                ) : (
                  <button onClick={() => startEditLeave('annual')} className="absolute top-6 right-6 w-8 h-8 bg-white/40 rounded-full flex items-center justify-center text-[#2a6896] hover:bg-white/60 transition-colors">
                    <PenLine size={14} />
                  </button>
                )}
                <Umbrella className="absolute bottom-4 right-4 w-32 h-32 text-[#7ab2db] opacity-30 -rotate-12" strokeWidth={2} />
                <div className="relative z-10 px-2 mb-2">
                  <h3 className="font-bold text-[17px] font-fredoka text-[#2a6896] mb-4">Annual Leave</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-[64px] font-fredoka font-bold text-[#2a6896] leading-none">{pad(leaveQuotas.annual.used)}</span>
                    <span className="text-[18px] font-bold text-[#2a6896] opacity-80">
                      / {editingLeave === 'annual' ? (
                        <input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && saveEditLeave()}
                          className="w-12 bg-white/60 rounded-lg px-2 py-0.5 text-[16px] font-bold text-[#2a6896] outline-none text-center"
                          autoFocus
                        />
                      ) : `${leaveQuotas.annual.total} days`}
                    </span>
                  </div>
                  <div className="w-full bg-[#7ab2db] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#2a6896] h-full rounded-full transition-all" style={{ width: getBarWidth(leaveQuotas.annual.used, leaveQuotas.annual.total) }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-[40px] p-8 pb-10 shadow-sm flex flex-col w-full h-full">
              <div className="flex items-start justify-between mb-8 px-2 mt-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-[22px] font-fredoka text-[#3f4a51] tracking-wide m-0">Recent Activity</h3>
                </div>
                <button 
                  onClick={() => setShowAllActivities(!showAllActivities)}
                  className="text-[15px] font-bold text-[#5e6c7e] hover:text-[#3f4a51] transition-colors pt-1"
                >
                  {showAllActivities ? 'Show Less' : 'View All'}
                </button>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                {displayedActivities.map((act) => {
                  const { Icon, color, bg } = iconData[act.icon];
                  return (
                    <div key={act.id} className="flex items-center justify-between p-5 bg-[#f9fafb] rounded-[24px]">
                      <div className="flex items-center gap-5">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center p-3"
                          style={{ backgroundColor: bg }}
                        >
                          <Icon color={color} strokeWidth={2.5} />
                        </div>
                        <div>
                          <p className="font-bold text-[16px] font-fredoka text-[#3f4a51] mb-1">{act.type}</p>
                          <p className="text-[13px] font-medium text-[#94a3b8]">{act.date}</p>
                        </div>
                      </div>
                      <span
                        className="px-5 py-2 rounded-full text-[12px] font-bold tracking-wide"
                        style={{
                          backgroundColor: statusStyles[act.status].bg,
                          color: statusStyles[act.status].text
                        }}
                      >
                        {act.status}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>

          {/* Right Column (Contact Details, Address) */}
          <div className="flex flex-col gap-6">

            {/* Contact Details */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#d1ebdf]"></div>
              <h3 className="font-bold text-[19px] font-fredoka text-[#323940] tracking-wide mb-8">Contact Details</h3>

              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#eef2f9] flex items-center justify-center text-[#4d6b63]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#94a3b8] tracking-widest uppercase mb-1">Work Email</p>
                    <p className="font-bold text-[15px] text-[#323940]">somchai.dev@company.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#eef2f9] flex items-center justify-center text-[#4d6b63]">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#94a3b8] tracking-widest uppercase mb-1">Mobile Number</p>
                    <p className="font-bold text-[15px] text-[#323940]">+66 81-123-4567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Location */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[19px] font-fredoka text-[#323940] tracking-wide">Address Location</h3>
                <span className="bg-[#ccfae8] text-[#24805e] px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase">Primary</span>
              </div>

              {/* Google Maps iFrame */}
              <div className="w-full h-[180px] rounded-2xl bg-gray-100 relative mb-6 overflow-hidden shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15502.946114424756!2d100.5613303!3d13.7335607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29e8d19e34e59%3A0xe549520b7274db49!2sSukhumvit%20Rd%2C%20Bangkok%2C%20Thailand!5e0!3m2!1sen!2sth!4v1712555000000!5m2!1sen!2sth"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Employee Address"
                />
              </div>

              <div>
                <p className="text-[#323940] text-[18px] font-bold mb-1">
                  123/45 Sukhumvit 42
                </p>
                <p className="text-[#64748b] text-[15px] font-medium leading-relaxed">
                  Khwaeng Phra Khanong, Khet Khlong Toei<br />
                  Bangkok 10110, Thailand
                </p>
                <a
                  href="https://goo.gl/maps/placeholder"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 mt-3 text-[14px] font-bold text-[#3ea8e5] hover:text-[#2d8abf] transition-colors"
                >
                  <MapPin size={12} />
                  View on Google Maps
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f3747]/40 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] p-8 max-w-sm w-full mx-6 shadow-2xl flex flex-col items-center">
            <div className="w-16 h-16 bg-[#ffe2e5] rounded-full flex items-center justify-center mb-6">
              <Trash2 size={24} className="text-[#f05252]" />
            </div>
            <h3 className="text-[24px] font-fredoka font-bold text-[#1f3747] text-center mb-2">Delete Employee?</h3>
            <p className="text-[#64748b] text-[15px] text-center mb-8 font-medium">
              This will permanently remove <span className="font-bold text-[#323940]">Somchai</span>'s profile and all associated data. This action cannot be undone.
            </p>
            <div className="flex gap-4 w-full">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 !py-3.5 !px-4 rounded-full font-bold transition-colors"
                style={{ backgroundColor: '#e9eff5', color: '#4c6367', fontSize: '15px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteEmployee}
                className="flex-1 !py-3.5 !px-4 rounded-full font-bold transition-colors shadow-sm"
                style={{ backgroundColor: '#f05252', color: '#ffffff', fontSize: '15px' }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Access Modal */}
      {showAccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f3747]/40 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] p-8 max-w-md w-full mx-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#e9eff5' }}>
                  <Shield size={22} className="text-[#4c6367]" />
                </div>
                <div>
                  <h3 className="text-[22px] font-fredoka font-bold text-[#1f3747]">Manage Access</h3>
                  <p className="text-[13px] text-[#94a3b8] font-medium">Somchai's permissions</p>
                </div>
              </div>
              <button onClick={() => setShowAccessModal(false)} className="w-8 h-8 rounded-full bg-[#f4f7f9] flex items-center justify-center text-[#64748b] hover:bg-[#e2e8f0] transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-5">
              {/* Role */}
              <div>
                <label className="text-[12px] font-bold text-[#94a3b8] tracking-widest uppercase mb-2 block">Role</label>
                <select
                  value={accessSettings.role}
                  onChange={(e) => setAccessSettings(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full bg-[#f4f7f9] rounded-2xl py-3.5 px-5 text-[15px] font-bold text-[#323940] appearance-none border-none outline-none focus:ring-2 focus:ring-[#567278]/20 cursor-pointer"
                >
                  <option>Employee</option>
                  <option>Admin</option>
                  <option>HR</option>
                  <option>Super Admin</option>
                </select>
              </div>

              {/* Toggles */}
              {[
                { key: 'canApprove', label: 'Can Approve Requests', desc: 'Allow this user to approve leave requests' },
                { key: 'canViewReports', label: 'Can View Reports', desc: 'Grant access to company-wide reports' },
                { key: 'isActive', label: 'Account Active', desc: 'Enable or disable this account' },
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between p-4 bg-[#f9fafb] rounded-2xl">
                  <div>
                    <p className="font-bold text-[14px] text-[#323940]">{setting.label}</p>
                    <p className="text-[12px] text-[#94a3b8] font-medium">{setting.desc}</p>
                  </div>
                  <button
                    onClick={() => setAccessSettings(prev => ({ ...prev, [setting.key]: !prev[setting.key] }))}
                    className={`w-12 h-7 rounded-full flex items-center px-1 transition-colors ${accessSettings[setting.key] ? 'justify-end' : 'justify-start'}`}
                    style={{ backgroundColor: accessSettings[setting.key] ? '#2c7356' : '#cbd5e1' }}
                  >
                    <div className="w-5 h-5 bg-white rounded-full shadow-sm transition-transform" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowAccessModal(false)}
                className="flex-1 !py-3.5 rounded-full font-bold transition-colors"
                style={{ backgroundColor: '#e9eff5', color: '#4c6367', fontSize: '15px' }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAccessModal(false)}
                className="flex-1 !py-3.5 rounded-full font-bold transition-colors"
                style={{ backgroundColor: '#dcf5eb', color: '#2c7356', fontSize: '15px' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
