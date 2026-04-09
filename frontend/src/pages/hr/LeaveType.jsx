import { useState } from 'react'
import {
  Umbrella,
  Users,
  Thermometer,
  Home,
  Plane,
  Smile,
  HeartHandshake,
  PartyPopper,
  MoreHorizontal,
  Edit2,
  Trash2,
  Plus,
  Calendar,
  Check,
} from 'lucide-react'
import Header from '../../components/Header'

export default function LeaveType({ onNavigate }) {
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'employee', label: 'Employee' },
    { id: 'reports', label: 'Reports' },
    { id: 'leave-type', label: 'Leave Type' }
  ]

  const adminProfile = {
    name: 'Admin User',
    role: 'Global HR Manager'
  }

  // Temporary list of leaves
  const [leaveTypes, setLeaveTypes] = useState([
    {
      id: 1,
      name: 'Vacation Leave',
      quota: 6,
      description: 'Standard annual leave for rest and recreation. Accrues monthly at a rate of 1.67 days.',
      colorType: 'blue',
      icon: Umbrella
    },
    {
      id: 2,
      name: 'Personal Leave',
      quota: 3,
      description: 'Flex time for appointments, family matters, or well-being days. Granted upfront at the start of the year.',
      colorType: 'pink',
      icon: Users
    },
    {
      id: 3,
      name: 'Sick Leave',
      quota: 30,
      description: 'Reserved for illness, injury, or medical recovery. Requires documentation for more than 3 consecutive days.',
      colorType: 'orange',
      icon: Thermometer
    }
  ])

  // Map abstract colors to Tailwind styles
  const colorStyles = {
    blue: {
      bg: 'bg-[#a3dfff]',
      iconBg: 'bg-[#d6efff]',
      iconColor: 'text-[#006dae]',
      btnBg: 'bg-[#d6efff]',
      title: 'text-[#006dae]',
      desc: 'text-[#1e3450]',
      footer: 'border-[#7bbbee]',
      footerText: 'text-[#005a91]'
    },
    pink: {
      bg: 'bg-[#ffafe3]',
      iconBg: 'bg-[#ffd6ee]',
      iconColor: 'text-[#8c2d68]',
      btnBg: 'bg-[#ffd6ee]',
      title: 'text-[#8c2d68]',
      desc: 'text-[#5a1c43]',
      footer: 'border-[#df8ebf]',
      footerText: 'text-[#7a2559]'
    },
    orange: {
      bg: 'bg-[#fac47f]',
      iconBg: 'bg-[#ffe3c2]',
      iconColor: 'text-[#b86814]',
      btnBg: 'bg-[#ffe3c2]',
      title: 'text-[#3E4249]', // Wait, title in mockup is dark slate or similar
      desc: 'text-[#8d5415]',
      footer: 'border-[#e0a863]',
      footerText: 'text-[#9e5910]'
    }
  }

  const [form, setForm] = useState({
    name: '',
    description: '',
    days: '',
    service: '',
    icon: 'umbrella',
    color: 'blue',
    reqManager: true,
    carryover: false,
    reqAttachment: false
  })

  // Dummy toggle component
  const Toggle = ({ active, onClick }) => (
    <div
      onClick={onClick}
      className={`w-12 h-6 rounded-full cursor-pointer flex items-center transition-colors px-1 ${active ? 'bg-[#265345]' : 'bg-[#d1d5db]'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${active ? 'translate-x-6' : 'translate-x-0'}`} />
    </div>
  )

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'umbrella': return Umbrella
      case 'thermometer': return Thermometer
      case 'user': return Users
      case 'plane': return Plane
      case 'smile': return Smile
      case 'heart': return HeartHandshake
      case 'party': return PartyPopper
      case 'more': return MoreHorizontal
      default: return Umbrella
    }
  }

  const getIconName = (IconComponent) => {
    switch (IconComponent) {
      case Umbrella: return 'umbrella'
      case Thermometer: return 'thermometer'
      case Users: return 'user'
      case Plane: return 'plane'
      case Smile: return 'smile'
      case HeartHandshake: return 'heart'
      case PartyPopper: return 'party'
      case MoreHorizontal: return 'more'
      default: return 'umbrella'
    }
  }

  const handleDelete = (id) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    if (deleteId) {
      setLeaveTypes(leaveTypes.filter(leave => leave.id !== deleteId))
      setDeleteId(null)
    }
  }

  const handleEdit = (leave) => {
    setForm({
      name: leave.name,
      description: leave.description,
      days: leave.quota,
      service: '', // default empty
      icon: getIconName(leave.icon),
      color: leave.colorType,
      reqManager: true,
      carryover: false,
      reqAttachment: false
    })
    setEditingId(leave.id)
    setIsCreating(true)
  }

  const handleSubmit = () => {
    if (editingId) {
      setLeaveTypes(leaveTypes.map(leave =>
        leave.id === editingId ? {
          ...leave,
          name: form.name || 'Untitled Leave',
          quota: form.days || 0,
          description: form.description || 'No description provided.',
          colorType: form.color || 'blue',
          icon: getIconComponent(form.icon)
        } : leave
      ))
    } else {
      const newLeave = {
        id: Date.now(),
        name: form.name || 'Untitled Leave',
        quota: form.days || 0,
        description: form.description || 'No description provided.',
        colorType: form.color || 'blue',
        icon: getIconComponent(form.icon)
      }
      setLeaveTypes([...leaveTypes, newLeave])
    }


    setIsCreating(false)
    setEditingId(null)

    // Reset form for next time
    setForm({
      name: '',
      description: '',
      days: '',
      service: '',
      icon: 'umbrella',
      color: 'blue',
      reqManager: true,
      carryover: false,
      reqAttachment: false
    })
  }

  return (
    <div className="min-h-screen bg-[#eef2f9] flex flex-col font-nunito">
      <Header
        activePage="leave-type"
        onNavigate={onNavigate}
        navItems={adminNavItems}
        user={adminProfile}
      />

      <main className="max-w-6xl mx-auto px-6 py-12 w-full flex-grow">
        {!isCreating ? (
          <>
            <div className="flex justify-between items-start mb-10">
              <div className="max-w-2xl">
                <h1 className="text-[44px] font-fredoka font-bold text-[#1f3747] mb-2 leading-tight">
                  Manage Leave Types
                </h1>
                <p className="text-[#59646b] text-[16px] font-medium tracking-wide">
                  Define and configure your organization's time-off rules. Adjust quotas, accrual methods, and eligibility requirements for each category.
                </p>
              </div>
              <button
                onClick={() => setIsCreating(true)}
                className="text-white !px-8 !py-4 rounded-full font-bold flex items-center gap-2 transition-colors mt-24"
                style={{ fontSize: '18px', backgroundColor: '#4c6367' }}
              >
                <Plus size={20} /> Create New Leave Type
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Existing Leave Types */}
              {leaveTypes.map((leave) => {
                const colors = colorStyles[leave.colorType] || colorStyles.blue
                const Icon = leave.icon
                return (
                  <div key={leave.id} className={`rounded-[32px] p-6 flex flex-col ${colors.bg} shadow-sm min-h-[380px]`}>
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colors.iconBg}`}>
                        <Icon size={24} className={colors.iconColor} />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(leave)} className={`w-8 h-8 rounded-full flex items-center justify-center ${colors.btnBg} hover:opacity-80 transition-opacity`}>
                          <Edit2 size={14} className={colors.iconColor} />
                        </button>
                        <button onClick={() => handleDelete(leave.id)} className={`w-8 h-8 rounded-full flex items-center justify-center ${colors.btnBg} hover:opacity-80 transition-opacity`}>
                          <Trash2 size={14} className={colors.iconColor} />
                        </button>
                      </div>
                    </div>

                    <h3 className={`text-[24px] font-fredoka font-bold mb-3 ${colors.title}`}>{leave.name}</h3>

                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${colors.btnBg} text-[12px] font-bold ${colors.iconColor} w-fit mb-4`}>
                      <Calendar size={14} /> {leave.quota} Days Annual Quota
                    </div>

                    <p className={`text-[13px] leading-relaxed mb-8 flex-grow ${colors.desc} font-medium`}>
                      {leave.description}
                    </p>

                    <div className={`pt-4 border-t ${colors.footer} flex justify-between items-center cursor-pointer group`}>
                      <span className={`text-[12px] font-bold tracking-widest uppercase ${colors.footerText}`}>Active Policy</span>
                      <span className={`text-[16px] ${colors.footerText} group-hover:translate-x-1 transition-transform`}>›</span>
                    </div>
                  </div>
                )
              })}

              {/* Add New Card */}
              <div
                onClick={() => setIsCreating(true)}
                className="rounded-[32px] border-2 border-dashed border-[#b0b8c1] flex flex-col items-center justify-center min-h-[380px] cursor-pointer hover:bg-white hover:border-[#a0xbsd1] transition-all group"
              >
                <div className="w-14 h-14 bg-[#e2e8f0] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus size={24} className="text-[#64748b]" />
                </div>
                <h3 className="text-[18px] font-fredoka font-bold text-[#1f3747] mb-1">New Leave Type</h3>
                <p className="text-[14px] text-[#64748b] font-medium text-center px-6">Configure a custom category for your team.</p>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-[40px] p-10 max-w-[850px] mx-auto shadow-sm">
            <h2 className="text-[32px] font-fredoka font-bold text-[#1f3747] mb-2 leading-tight">
              {editingId ? 'Edit Leave Type' : 'Create New Leave Type'}
            </h2>
            <p className="text-[#64748b] text-[15px] font-medium mb-10">
              Define a new category of balance for your team.
            </p>

            <div className="grid grid-cols-[1.5fr_1fr] gap-x-16 gap-y-8">
              {/* Left Column */}
              <div className="flex flex-col gap-6">
                <div>
                  <label className="block text-[12px] font-bold text-[#4c6367] tracking-wider uppercase mb-2">Leave Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Study Leave"
                    className="w-full bg-[#dee4ec] text-[#1f3747] rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-[#a3dfff] font-medium"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#4c6367] tracking-wider uppercase mb-2">Description</label>
                  <textarea
                    placeholder="..."
                    rows="4"
                    className="w-full bg-[#dee4ec] text-[#1f3747] rounded-[24px] px-5 py-4 outline-none focus:ring-2 focus:ring-[#a3dfff] font-medium resize-none"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#4c6367] tracking-wider uppercase mb-2">Default Days Per Year</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full bg-[#dee4ec] text-[#1f3747] rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-[#a3dfff] font-medium"
                      value={form.days}
                      onChange={(e) => setForm({ ...form, days: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#4c6367] tracking-wider uppercase mb-2">Minimum Service Required</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full bg-[#dee4ec] text-[#1f3747] rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-[#a3dfff] font-medium"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-8">
                <div>
                  <label className="block text-[12px] font-bold text-[#4c6367] tracking-wider uppercase mb-3">Category Icon</label>
                  <div className="bg-[#e9eff5] rounded-[32px] p-5">
                    <div className="grid grid-cols-4 gap-3">
                      {[Umbrella, Thermometer, Users, Plane, Smile, HeartHandshake, PartyPopper, MoreHorizontal].map((Icon, idx) => {
                        const iconNames = ['umbrella', 'thermometer', 'user', 'plane', 'smile', 'heart', 'party', 'more']
                        const isSelected = form.icon === iconNames[idx]
                        return (
                          <button
                            key={idx}
                            onClick={() => setForm({ ...form, icon: iconNames[idx] })}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isSelected ? 'bg-white shadow-sm ring-2 ring-[#a3dfff]' : 'hover:bg-white/50'
                              }`}
                          >
                            <Icon size={20} className={isSelected ? 'text-[#006dae]' : 'text-[#64748b]'} />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#4c6367] tracking-wider uppercase mb-3">Identity Color</label>
                  <div className="!bg-[#e9eff5] rounded-[32px] py-4 px-6 inline-flex gap-4 items-center">
                    {[
                      { id: 'green', hex: '#B1EFD8' },
                      { id: 'orange', hex: '#FFBF95' },
                      { id: 'pink', hex: '#FFAADA' },
                      { id: 'blue', hex: '#A1D9FF' },
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setForm({ ...form, color: c.id })}
                        className={`w-8 h-8 rounded-full transition-transform ${form.color === c.id ? 'ring-4 ring-white shadow-md scale-110' : 'hover:scale-105'}`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Policy Settings */}
            <div className="mt-8 bg-[#f8fafc] rounded-[32px] p-6 lg:p-8">
              <h4 className="text-[12px] font-bold text-[#4c6367] tracking-wider uppercase mb-6">Policy Settings</h4>

              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[15px] font-bold text-[#1f3747] mb-0.5">Requires Manager Approval</p>
                    <p className="text-[13px] text-[#64748b]">Disable will be auto approved.</p>
                  </div>
                  <Toggle active={form.reqManager} onClick={() => setForm({ ...form, reqManager: !form.reqManager })} />
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-5">
                  <div>
                    <p className="text-[15px] font-bold text-[#1f3747] mb-0.5">Allows Year-to-Year Carryover</p>
                    <p className="text-[13px] text-[#64748b]">Unused balance will be added to next year's quota.</p>
                  </div>
                  <Toggle active={form.carryover} onClick={() => setForm({ ...form, carryover: !form.carryover })} />
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-5">
                  <div>
                    <p className="text-[15px] font-bold text-[#1f3747] mb-0.5">Requires Attachment/File Upload</p>
                    <p className="text-[13px] text-[#64748b]">Mandatory proof for categories like Medical or Compassionate leave.</p>
                  </div>
                  <Toggle active={form.reqAttachment} onClick={() => setForm({ ...form, reqAttachment: !form.reqAttachment })} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-10">
              <button
                onClick={handleSubmit}
                className="!bg-[#d1ebdf] text-[#265345] !px-8 !py-4 rounded-full font-bold hover:!bg-[#b0dccc] transition-colors"
                style={{ fontSize: '18px' }}
              >
                {editingId ? 'Save Changes' : 'Create Leave Type'}
              </button>

              <button
                onClick={() => {
                  setIsCreating(false)
                  setEditingId(null)
                  setForm({
                    name: '', description: '', days: '', service: '', icon: 'umbrella', color: 'blue', reqManager: true, carryover: false, reqAttachment: false
                  })
                }}
                className="!bg-gray-800 text-white !px-8 !py-4 rounded-full font-bold hover:bg-blue-700 transition-colors"
                style={{ fontSize: '18px' }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f3747]/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-[32px] p-8 max-w-sm w-full mx-6 shadow-2xl flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-[#ffe2e5] rounded-full flex items-center justify-center mb-6">
              <Trash2 size={24} className="text-[#f05252]" />
            </div>
            <h3 className="text-[24px] font-fredoka font-bold text-[#1f3747] text-center mb-2">Delete Policy?</h3>
            <p className="text-[#64748b] text-[15px] text-center mb-8 font-medium">
              This action cannot be undone. Are you sure you want to completely remove this leave type?
            </p>
            <div className="flex gap-4 w-full">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 !py-3.5 !px-4 !bg-[#e9eff5] hover:bg-[#dce4ec] text-[#4c6367] rounded-full font-bold transition-colors"
                style={{ fontSize: '15px' }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 !py-3.5 !px-4 !bg-[#f05252] hover:bg-[#d64545] text-white rounded-full font-bold transition-colors shadow-sm"
                style={{ fontSize: '15px' }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
