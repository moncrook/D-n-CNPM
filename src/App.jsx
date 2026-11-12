
import React, { useMemo, useState } from "react";
import {
  Activity, AlertCircle, BarChart3, Bell, BookOpen, CalendarDays, Check,
  CheckCircle2, ChevronRight, ClipboardList, Clock3, Edit3, Eye, FileText,
  Filter, HeartPulse, Home, LayoutDashboard, Lock, LockOpen, LogIn, LogOut, Mail,
  MapPin, Menu, MessageCircle, MoreHorizontal, Phone, Plus, Search, Send,
  Settings, ShieldCheck, Star, Trash2, UserCheck, UserRound, UserRoundPlus,
  Users, X
} from "lucide-react";

const imageAssets = {
  hero: "https://duonglaobinhmy.com/wp-content/uploads/2024/03/nhu-cau-cham-soc-nguoi-cao-tuoi-hien-nay-1024x683.jpg",
  elderly: "https://images.unsplash.com/photo-1559234938-b60fff04894d?auto=format&fit=crop&w=700&q=85",
  caregiver1: "https://cafefcdn.com/203337114487263232/2023/10/25/istockphoto-1400090823-612x612-1698220026196291856506-1698222165120-16982221655121365563612.jpg",
  caregiver2: "https://product.hstatic.net/1000116947/product/dong_phuc_dieu_duong__ho_ly_bv_tam_anh_0224f4a0089c491d8584de141ee18af6_grande.jpg",
  caregiver3: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=500&q=85",
  profile: "https://cafebiz.cafebizcdn.vn/162123310254002176/2024/5/30/0f5cc419d8dbd7faf6aa1f6435d2271a-2117-1717039584180-17170395843331674490244.jpeg"
};

const caregiverImage = id => ({ 1: imageAssets.caregiver1, 2: imageAssets.caregiver2, 3: imageAssets.caregiver3 }[id] || imageAssets.caregiver1);

const initialUsers = [
  { id: 1, name: "Nguyễn Minh An", email: "an@gmail.com", phone: "0901 222 333", role: "Người cần chăm sóc/Người thân", status: "Hoạt động" },
  { id: 2, name: "Nguyễn Thị Lan", email: "lan.care@gmail.com", phone: "0901 234 567", role: "Người chăm sóc", status: "Đã duyệt" },
  { id: 3, name: "Trần Minh Anh", email: "minhanh.care@gmail.com", phone: "0902 345 678", role: "Người chăm sóc", status: "Chờ duyệt" },
];

const initialElderly = [
  { id: 1, name: "Nguyễn Văn Bình", age: 76, gender: "Nam", relation: "Cha", health: "Ổn định", phone: "0901 234 567", address: "Vỹ Dạ, Huế" },
  { id: 2, name: "Trần Thị Hoa", age: 71, gender: "Nữ", relation: "Mẹ", health: "Cần theo dõi", phone: "0902 345 678", address: "An Cựu, Huế" },
];

const initialCaregivers = [
  { id: 1, name: "Nguyễn Thị Lan", exp: "5 năm", rating: 4.9, reviews: 86, area: "TP. Huế", skills: "Chăm sóc người cao tuổi, Hỗ trợ sinh hoạt", time: "08:00 - 17:00", certificate: "Chứng chỉ chăm sóc người cao tuổi", price: "120.000đ/giờ", scope: "Chăm sóc sinh hoạt, hỗ trợ ăn uống", availability: "T2-T7", status: "Hoạt động" },
  { id: 2, name: "Trần Minh Anh", exp: "4 năm", rating: 4.8, reviews: 64, area: "TP. Huế", skills: "Theo dõi sức khỏe, Vật lý trị liệu", time: "07:00 - 15:00", certificate: "Chứng chỉ vật lý trị liệu", price: "150.000đ/giờ", scope: "Theo dõi sức khỏe, hỗ trợ vận động", availability: "T2-T6", status: "Hoạt động" },
  { id: 3, name: "Lê Thị Hương", exp: "8 năm", rating: 5, reviews: 112, area: "Hương Thủy", skills: "Chăm sóc dài hạn, Dinh dưỡng", time: "08:00 - 18:00", certificate: "Chứng chỉ chăm sóc dài hạn", price: "130.000đ/giờ", scope: "Chăm sóc dài hạn, dinh dưỡng", availability: "T2-CN", status: "Hoạt động" },
];

const initialRequests = [
  { id: "CR-1025", elderly: "Lê Văn Cẩn", type: "Vật lý trị liệu", location: "Phú Bài, Huế", date: "06/10/2026", time: "14:00 - 16:00", registered: 0, status: "Chờ nhận đăng ký", isApplied: false },
  { id: "CR-1024", elderly: "Nguyễn Văn Bình", type: "Chăm sóc tại nhà", location: "Vỹ Dạ, Huế", date: "04/10/2026", time: "08:00 - 12:00", registered: 3, status: "Có người đăng ký", isApplied: true },
  { id: "CR-1023", elderly: "Trần Thị Hoa", type: "Hỗ trợ sinh hoạt", location: "An Cựu, Huế", date: "05/10/2026", time: "13:00 - 17:00", registered: 1, status: "Đã chọn người chăm sóc", isApplied: false },
];

const initialSchedules = [
  { id: "SC-501", date: "04/10/2026", time: "08:00 - 12:00", elderly: "Nguyễn Văn Bình", caregiver: "Nguyễn Thị Lan", owner: "Nguyễn Minh An", status: "Chờ xác nhận", checkIn: "Chưa check-in", checkOut: "Chưa check-out" },
  { id: "SC-502", date: "05/10/2026", time: "13:00 - 17:00", elderly: "Trần Thị Hoa", caregiver: "Trần Minh Anh", owner: "Nguyễn Minh An", status: "Đang chăm sóc", checkIn: "13:02", checkOut: "Chưa check-out" },
  { id: "SC-503", date: "07/10/2026", time: "09:00 - 12:00", elderly: "Nguyễn Văn Bình", caregiver: "Nguyễn Thị Lan", owner: "Nguyễn Minh An", status: "Chờ xác nhận hoàn thành", checkIn: "09:01", checkOut: "12:03" },
  { id: "SC-499", date: "28/09/2026", time: "08:00 - 11:00", elderly: "Nguyễn Văn Bình", caregiver: "Lê Thị Hương", owner: "Nguyễn Minh An", status: "Hoàn thành", checkIn: "08:03", checkOut: "10:57" },
];

const initialReviews = [
  { id: 1, user: "Nguyễn Minh An", caregiver: "Nguyễn Thị Lan", rating: 5, content: "Rất tận tâm, đúng giờ.", status: "Đã duyệt", date: "28/09/2026" },
  { id: 2, user: "Lê Quốc Nam", caregiver: "Trần Minh Anh", rating: 2, content: "Cần cải thiện việc cập nhật lịch.", status: "Chờ duyệt", date: "27/09/2026" },
];

const initialPosts = [
  { id: 1, title: "5 nguyên tắc chăm sóc người cao tuổi tại nhà", category: "Sức khỏe", author: "Admin", status: "Đã đăng", date: "25/09/2026" },
  { id: 2, title: "Cách chuẩn bị lịch chăm sóc an toàn", category: "Hướng dẫn", author: "Admin", status: "Bản nháp", date: "22/09/2026" },
];

const initialNotices = [
  { id: 1, title: "Bảo trì hệ thống", content: "Hệ thống sẽ bảo trì lúc 23:00.", target: "Tất cả", status: "Đã gửi" },
  { id: 2, title: "Lịch chăm sóc sắp bắt đầu", content: "CR-1024 bắt đầu lúc 08:00.", target: "Người thân", status: "Đã gửi" },
];

const initialEmergencyContacts = [
  { id: 1, elderly: "Nguyễn Văn Bình", name: "Nguyễn Minh An", relation: "Con trai", phone: "0901 222 333", priority: "Chính" },
  { id: 2, elderly: "Trần Thị Hoa", name: "Trần Thị Mai", relation: "Con gái", phone: "0902 333 444", priority: "Dự phòng" },
];

const initialReports = [
  { id: "RP-001", requestId: "CR-1025", reporter: "Nguyễn Thị Lan", reason: "Thông tin yêu cầu chưa rõ ràng", detail: "Địa điểm và phạm vi công việc chưa được mô tả đầy đủ.", status: "Chờ kiểm duyệt", date: "01/10/2026" },
  { id: "RP-002", requestId: "CR-1023", reporter: "Trần Minh Anh", reason: "Nghi ngờ thông tin không phù hợp", detail: "Đề nghị Admin kiểm tra lại nội dung yêu cầu.", status: "Đã xử lý", date: "30/09/2026" },
];

const initialMedia = [
  { id: 1, name: "banner-careconnect.jpg", type: "Banner", status: "Đang sử dụng", url: imageAssets.hero },
  { id: 2, name: "caregiver-lan.jpg", type: "Hình người chăm sóc", status: "Đang sử dụng", url: imageAssets.caregiver1 },
  { id: 3, name: "elderly-care.jpg", type: "Hình minh họa", status: "Đang sử dụng", url: imageAssets.elderly },
];

const initialWebsiteInfo = {
  siteName: "CareConnect",
  slogan: "Kết nối chăm sóc tận tâm",
  phone: "0934 791 106",
  email: "support@careconnect.vn",
  address: "TP. Huế, Thừa Thiên Huế",
  introduction: "Nền tảng kết nối người cần chăm sóc người cao tuổi với người chăm sóc phù hợp."
};


const nav = {
  // ==========================================================
  // NHÓM 1: NGƯỜI CẦN CHĂM SÓC / NGƯỜI THÂN
  // ==========================================================
  family: [
    ["dashboard", "Tổng quan", LayoutDashboard],
    ["elderly", "Người cao tuổi", HeartPulse],
    ["emergency", "Liên hệ khẩn cấp", Phone],
    ["caregivers", "Tìm người chăm sóc", UserRoundPlus],
    ["requests", "Yêu cầu chăm sóc", ClipboardList],
    ["schedules", "Lịch chăm sóc", CalendarDays],
    ["reviews", "Đánh giá", Star],
    ["messages", "Tin nhắn", MessageCircle],
    ["notifications", "Thông báo", Bell],
    ["profile", "Hồ sơ cá nhân", UserRound],
    ["security", "Đổi mật khẩu", Lock],
  ],

  // ==========================================================
  // NHÓM 2: NGƯỜI CHĂM SÓC
  // ==========================================================
  caregiver: [
    ["dashboard", "Tổng quan", LayoutDashboard],
    ["care-profile", "Hồ sơ người chăm sóc", UserCheck],
    ["requests", "Yêu cầu chăm sóc", ClipboardList],
    ["schedules", "Lịch chăm sóc", CalendarDays],
    ["reviews", "Đánh giá", Star],
    ["messages", "Tin nhắn", MessageCircle],
    ["notifications", "Thông báo", Bell],
    ["profile", "Hồ sơ cá nhân", UserRound],
    ["security", "Đổi mật khẩu", Lock],
  ],

  // ==========================================================
  // NHÓM 3: ADMIN
  // ==========================================================
  admin: [
    ["dashboard", "Tổng quan", LayoutDashboard],
    ["users", "Quản lý tài khoản", Users],
    ["elderly-admin", "Quản lý người cao tuổi", HeartPulse],
    ["care-admin", "Quản lý người chăm sóc", UserCheck],
    ["requests-admin", "Quản lý yêu cầu", ClipboardList],
    ["reports-admin", "Kiểm duyệt báo cáo", ShieldCheck],
    ["reviews-admin", "Kiểm duyệt đánh giá", Star],
    ["notifications-admin", "Quản lý thông báo", Bell],
    ["content", "Quản lý bài viết", BookOpen],
    ["media-admin", "Hình ảnh & website", FileText],
    ["analytics", "Thống kê", BarChart3],
    ["profile", "Tài khoản Admin", UserRound],
    ["security", "Đổi mật khẩu", Lock],
  ]
};


const GlobalStyles = () => <style>{`
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap');

:root{
  --primary:#167c68;
  --primary-dark:#0f5f51;
  --primary-soft:#e9f7f3;
  --accent:#35b99f;
  --text:#17312c;
  --muted:#70807c;
  --line:#e7eeeb;
  --bg:#f5f8f7;
  --card:#ffffff;
  --danger:#df5b63;
  --warning:#d99a32;
  --shadow:0 10px 30px rgba(23,49,44,.07);
}
*{box-sizing:border-box}
html,body,#root{margin:0;min-height:100%;font-family:'Be Vietnam Pro',system-ui,sans-serif;color:var(--text);background:var(--bg)}
body{font-size:14px}
button,input,select,textarea{font:inherit}
button{cursor:pointer}
.app-shell{display:flex;min-height:100vh;background:var(--bg)}
.sidebar{position:fixed;inset:0 auto 0 0;width:258px;background:#fff;border-right:1px solid var(--line);display:flex;flex-direction:column;padding:22px 15px;z-index:30;box-shadow:4px 0 24px rgba(20,55,48,.03)}
.brand{display:flex;align-items:center;gap:11px;padding:2px 9px 22px}
.brand-mark{width:42px;height:42px;border-radius:13px;background:linear-gradient(145deg,var(--primary),#31b89d);color:#fff;display:grid;place-items:center;box-shadow:0 7px 18px rgba(22,124,104,.22)}
.brand-mark svg{width:22px}
.brand b{display:block;font-size:19px;letter-spacing:-.5px}.brand b span{color:var(--primary)}
.brand small{display:block;color:#8a9894;font-size:10px;margin-top:2px}
.role-box{background:#f3f8f6;border:1px solid #e1eeea;border-radius:14px;padding:10px;margin:0 2px 14px}
.role-box span{display:block;font-size:10px;font-weight:700;color:#7b8985;text-transform:uppercase;letter-spacing:.7px;margin:0 2px 5px}
.role-box select{width:100%;border:0;background:transparent;color:var(--text);font-weight:600;outline:none}
.sidebar nav{display:flex;flex-direction:column;gap:4px;overflow:auto;padding:2px 0}
.sidebar nav button,.logout{border:0;background:transparent;color:#65736f;border-radius:11px;padding:11px 12px;display:flex;align-items:center;gap:11px;text-align:left;font-weight:500;transition:.18s}
.sidebar nav button:hover{background:#f1f7f5;color:var(--primary)}
.sidebar nav button.active{background:var(--primary-soft);color:var(--primary);font-weight:700}
.sidebar nav button.active svg{stroke-width:2.4}
.logout{margin-top:auto;border-top:1px solid var(--line);border-radius:0;padding:16px 12px 3px;color:#8a6668}
.logout:hover{color:var(--danger);background:#fff6f6}
.main{margin-left:258px;min-width:0;flex:1}
.topbar{height:72px;background:rgba(255,255,255,.94);backdrop-filter:blur(14px);border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 32px;position:sticky;top:0;z-index:20}
.breadcrumb{display:flex;align-items:center;gap:7px;color:#8a9793;font-size:13px}.breadcrumb b{color:var(--text)}
.top-actions{display:flex;align-items:center;gap:10px}.icon-btn{width:40px;height:40px;border:1px solid var(--line);background:#fff;border-radius:11px;display:grid;place-items:center;color:#60716c;position:relative}.icon-btn:hover{border-color:#cfe0db;color:var(--primary);background:#f7fbfa}.icon-btn i{position:absolute;width:7px;height:7px;border-radius:50%;background:#ef656b;right:8px;top:8px;border:2px solid white}
.user-mini{display:flex;align-items:center;gap:10px;border:0;background:transparent;text-align:left;padding:4px 0}.user-mini b{display:block;font-size:12px}.user-mini small{display:block;color:#8a9793;font-size:9px;margin-top:2px;max-width:190px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.avatar{width:38px;height:38px;border-radius:50%;background:#e7f3f0;color:var(--primary);display:grid;place-items:center;font-weight:700;overflow:hidden;flex:none}.avatar img{width:100%;height:100%;object-fit:cover}.avatar.big{width:52px;height:52px}.avatar.huge{width:86px;height:86px}.avatar.small-photo{width:38px;height:38px}.photo-avatar{background:#dfeee9}
.mobile-menu{display:none;border:0;background:transparent;color:var(--text)}
.content{padding:30px 34px 45px;max-width:1500px;margin:auto}
.page-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:24px}
.page-head h1{margin:4px 0 5px;font-size:27px;letter-spacing:-.7px}.page-head p{margin:0;color:var(--muted);font-size:13px}.eyebrow{font-size:10px;font-weight:800;letter-spacing:1.1px;color:var(--primary);text-transform:uppercase}
.btn{border:0;background:var(--primary);color:#fff;border-radius:10px;min-height:40px;padding:0 15px;display:inline-flex;align-items:center;justify-content:center;gap:8px;font-weight:700;box-shadow:0 5px 13px rgba(22,124,104,.15);transition:.18s}.btn:hover{background:var(--primary-dark);transform:translateY(-1px)}.btn.outline{background:#fff;color:var(--primary);border:1px solid #cfe3dd;box-shadow:none}.btn.outline:hover{background:var(--primary-soft)}
.hero-panel{display:grid;grid-template-columns:1.15fr .85fr;min-height:300px;border-radius:20px;overflow:hidden;background:linear-gradient(135deg,#0e6f5e,#1b8e78);box-shadow:var(--shadow);margin-bottom:22px}.hero-copy{padding:38px;color:#fff;display:flex;flex-direction:column;justify-content:center}.hero-kicker{font-size:10px;font-weight:800;letter-spacing:1.2px;opacity:.78}.hero-copy h2{font-size:31px;line-height:1.18;margin:11px 0 12px;letter-spacing:-1px}.hero-copy p{max-width:560px;color:rgba(255,255,255,.82);line-height:1.7;margin:0}.hero-pills{display:flex;gap:9px;flex-wrap:wrap;margin-top:20px}.hero-pills span{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);padding:7px 10px;border-radius:99px;font-size:11px}.hero-photo{position:relative;min-height:300px}.hero-photo:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(15,100,84,.35),transparent 45%)}.hero-photo img{width:100%;height:100%;object-fit:cover}.hero-badge{position:absolute;z-index:2;bottom:18px;left:18px;background:rgba(255,255,255,.95);border-radius:12px;padding:10px 13px;display:flex;align-items:center;gap:9px;box-shadow:0 8px 25px rgba(0,0,0,.12)}.hero-badge svg{color:var(--primary)}.hero-badge b{display:block;font-size:11px}.hero-badge small{display:block;color:#7a8884;font-size:9px;margin-top:2px}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px}.stat-card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:17px;display:flex;align-items:center;gap:13px;box-shadow:0 5px 18px rgba(22,60,53,.035)}.stat-icon{width:43px;height:43px;border-radius:12px;background:var(--primary-soft);color:var(--primary);display:grid;place-items:center}.stat-card span,.stat-card small{display:block;color:var(--muted);font-size:10px}.stat-card strong{display:block;font-size:21px;margin:2px 0}
.dashboard-grid{display:grid;grid-template-columns:1.65fr 1fr;gap:18px}.card{background:#fff;border:1px solid var(--line);border-radius:16px;box-shadow:0 5px 18px rgba(22,60,53,.035)}.card-title,.section-head{display:flex;justify-content:space-between;align-items:center;gap:15px;padding:19px 20px;border-bottom:1px solid var(--line)}.card h2,.section-head h2{font-size:16px;margin:0}.card-title p,.section-head p{font-size:11px;color:var(--muted);margin:4px 0 0}.link-btn{border:0;background:none;color:var(--primary);font-weight:700;font-size:11px}.mini-list{padding:7px 20px 12px}.mini-row{display:flex;align-items:center;gap:12px;padding:13px 0;border-bottom:1px solid #f0f4f2}.mini-row:last-child{border-bottom:0}.mini-row>div:nth-child(2){flex:1}.mini-row b{display:block;font-size:12px}.mini-row span{display:block;color:var(--muted);font-size:10px;margin-top:3px}.date-box{width:42px;height:44px;background:#f1f7f5;border-radius:10px;text-align:center;padding-top:6px;color:var(--primary)}.date-box b{font-size:16px}.date-box small{font-size:8px}.quick{padding:18px}.quick h2{margin:0 0 9px}.quick button{width:100%;border:0;background:#f8faf9;margin-top:6px;border-radius:10px;padding:12px;display:flex;align-items:center;gap:10px;color:#4e625d;text-align:left}.quick button:hover{background:var(--primary-soft);color:var(--primary)}.quick button span{flex:1;font-size:11px;font-weight:600}
.status{display:inline-flex;align-items:center;width:max-content;border-radius:99px;padding:5px 9px;background:#edf5f3;color:#287866;font-size:10px;font-weight:700;white-space:nowrap}.status.warning{background:#fff6e6;color:#b27618}.status.danger{background:#fff0f1;color:#c44d56}.status.success{background:#eaf7ef;color:#328052}.status.info{background:#edf4fb;color:#3e70a4}
.table-card{overflow:hidden}.table-head{display:flex;align-items:center;gap:9px;padding:14px 18px;border-bottom:1px solid var(--line)}.search{height:39px;display:flex;align-items:center;gap:8px;border:1px solid #dfe9e5;background:#fff;border-radius:10px;padding:0 11px;flex:1;max-width:480px}.search svg{width:16px;color:#93a09d}.search input{border:0;outline:0;width:100%;font-size:12px;color:var(--text)}.filter-btn,.filter-select{height:39px;border:1px solid #dfe9e5;background:#fff;border-radius:10px;padding:0 12px;color:#596b66;display:inline-flex;align-items:center;gap:6px;font-size:11px}.filter-btn:hover{border-color:#c5dcd5;background:#f7fbfa}.filter-select{outline:0}.account-filters .search{max-width:none}
.table-scroll{overflow-x:auto}table{width:100%;border-collapse:collapse;min-width:700px}th{background:#f8faf9;color:#7a8884;font-size:10px;text-transform:uppercase;letter-spacing:.35px;text-align:left;padding:12px 17px;border-bottom:1px solid var(--line);white-space:nowrap}td{padding:14px 17px;border-bottom:1px solid #edf2f0;color:#465953;font-size:12px;vertical-align:middle}tbody tr:hover{background:#fbfdfc}td b{color:var(--text)}td small{display:block;color:#899590;font-size:10px;margin-top:3px}.actions{display:flex!important;flex-direction:row!important;align-items:center;justify-content:flex-start;gap:6px;flex-wrap:nowrap;white-space:nowrap;width:max-content;min-width:max-content}
.action{width:34px;height:34px;min-width:34px;flex:0 0 34px;border:1px solid #e1e9e6;background:#fff;color:#667772;border-radius:8px;display:inline-flex!important;align-items:center;justify-content:center;padding:0;margin:0}
.action:hover{background:#f0f7f5;color:var(--primary);border-color:#cfe2dc}
.action.success{color:#328052;background:#edf8f1;border-color:#d8eddf}
.action.danger{color:#c84d56;background:#fff5f5;border-color:#f3dddd}
.action.warning-action{color:#ae791e;background:#fff7e9;border-color:#f0e2c5}.role-pill,.count-badge{display:inline-block;padding:5px 8px;background:#f0f5f3;color:#4f6861;border-radius:7px;font-size:10px;font-weight:600}.permission-box{margin:15px 18px 18px;padding:13px 14px;background:#f3f8f6;border:1px solid #dcebe6;border-radius:11px;display:flex;gap:10px;color:var(--primary)}.permission-box div{color:var(--text)}.permission-box b,.permission-box span{display:block}.permission-box span{color:var(--muted);font-size:10px;margin-top:3px}
.filter-bar{display:flex;gap:9px;margin-bottom:18px;flex-wrap:wrap}.filter-bar .search{max-width:none;flex:1;min-width:240px}.care-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.care-card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:18px;box-shadow:0 5px 18px rgba(22,60,53,.035)}.care-card:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(22,60,53,.08);transition:.2s}.care-top{display:flex;justify-content:space-between;align-items:center}.care-card h3{font-size:15px;margin:14px 0 3px}.care-card>p{color:var(--muted);font-size:11px;margin:0}.rating{color:#b77b18;font-size:11px;font-weight:700;display:flex;align-items:center;gap:4px;margin-top:9px}.rating span{color:#8b9793;font-weight:500}.chips{display:flex;flex-wrap:wrap;gap:5px;margin:13px 0}.chips span{font-size:9px;background:#f1f7f5;color:#537068;padding:5px 7px;border-radius:6px}.care-foot{display:flex;align-items:center;justify-content:space-between;border-top:1px solid #edf2f0;padding-top:13px}.care-foot>span{display:flex;align-items:center;gap:5px;color:#7d8c87;font-size:10px}
.profile-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:18px}.profile-card{overflow:hidden}.profile-cover{height:105px;background:linear-gradient(135deg,#dcefe9,#a8d9cb)}.profile-body{text-align:center;padding:0 22px 24px}.profile-body .avatar{margin:43px auto 12px;border:5px solid white}.profile-body h2{font-size:19px;margin:0 0 4px}.profile-body p{color:var(--muted);font-size:11px;margin:0}.profile-actions{display:flex;justify-content:center;gap:7px;flex-wrap:wrap;margin-top:15px}.info-card{padding-bottom:8px}.info-card>h2{padding:20px 20px 8px;font-size:16px}.info-list{padding:0 20px}.info-row{display:flex;justify-content:space-between;gap:20px;padding:13px 0;border-bottom:1px solid #edf2f0}.info-row:last-child{border-bottom:0}.info-row span{color:#7b8985;font-size:11px}.info-row b{font-size:11px;text-align:right;color:var(--text);max-width:62%}
.review-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px}.review-card{padding:17px}.review-head{display:flex;align-items:center;gap:9px}.review-head>div:nth-child(2){flex:1}.review-head small{display:block;color:var(--muted);font-size:9px;margin-top:3px}.stars{color:#e2a53b;font-size:12px}.review-card>p{color:#5c6b67;line-height:1.6;font-size:12px}
.chat{display:grid;grid-template-columns:260px 1fr;min-height:560px;overflow:hidden}.chat-list{border-right:1px solid var(--line);padding:10px}.chat-contact{display:flex;gap:9px;align-items:center;padding:11px;border-radius:10px}.chat-contact.active,.chat-contact:hover{background:#f0f7f5}.chat-contact b{display:block;font-size:11px}.chat-contact small{color:#8a9793;font-size:9px}.chat-main{display:flex;flex-direction:column}.chat-head{padding:16px 20px;border-bottom:1px solid var(--line)}.chat-head b{display:block;font-size:13px}.chat-head span{font-size:10px;color:var(--muted)}.messages{padding:20px;flex:1;background:#f8faf9;overflow:auto}.bubble-row{display:flex;margin-bottom:10px}.bubble-row.mine{justify-content:flex-end}.bubble{max-width:68%;background:#fff;border:1px solid var(--line);padding:10px 12px;border-radius:12px 12px 12px 3px;font-size:12px;line-height:1.5;box-shadow:0 2px 7px rgba(0,0,0,.025)}.mine .bubble{background:var(--primary);border-color:var(--primary);color:#fff;border-radius:12px 12px 3px 12px}.bubble small{display:block;opacity:.65;font-size:8px;margin-top:4px}.composer{display:flex;gap:8px;padding:12px;border-top:1px solid var(--line)}.composer input{flex:1;border:1px solid #dfe8e5;border-radius:10px;padding:0 12px;height:40px;outline:0}.composer input:focus{border-color:#8dcabc}.composer button{width:40px;border:0;border-radius:10px;background:var(--primary);color:#fff}
.notifications{overflow:hidden}.notification-row.unread{background:#f2faf7;border-left:3px solid var(--primary)}
.notification-row{display:flex;align-items:flex-start;gap:13px;padding:17px 20px;border-bottom:1px solid #edf2f0}.notification-row.unread{background:#f2faf7;border-left:3px solid var(--primary)}
.notification-row:last-child{border:0}.notice-icon{width:38px;height:38px;border-radius:10px;background:var(--primary-soft);color:var(--primary);display:grid;place-items:center}.notification-row.unread{background:#f2faf7;border-left:3px solid var(--primary)}
.notification-row b{font-size:12px}.notification-row.unread{background:#f2faf7;border-left:3px solid var(--primary)}
.notification-row p{margin:4px 0;color:#677772;font-size:11px}.notification-row.unread{background:#f2faf7;border-left:3px solid var(--primary)}
.notification-row small{color:#9aa5a1;font-size:9px}.notification-row.unread{background:#f2faf7;border-left:3px solid var(--primary)}
.notification-row>svg{margin-left:auto;color:#a4aeab}
.form-card{padding:20px}.narrow{max-width:680px}.form-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px}.field{display:flex;flex-direction:column;gap:6px}.field span{font-size:10px;font-weight:700;color:#63726e}.field input,.field select,.field textarea{width:100%;min-height:41px;border:1px solid #dce7e3;border-radius:9px;padding:0 11px;outline:0;background:#fff;color:var(--text)}.field input:focus,.field select:focus,.field textarea:focus{border-color:#8dcabc;box-shadow:0 0 0 3px rgba(53,185,159,.09)}.field textarea{padding:10px;min-height:100px;resize:vertical}.full{grid-column:1/-1}.actions-row{display:flex;gap:8px}
.modal-backdrop{position:fixed;inset:0;background:rgba(17,40,35,.48);backdrop-filter:blur(4px);display:grid;place-items:center;padding:22px;z-index:100}.modal{width:min(720px,100%);max-height:90vh;overflow:auto;background:#fff;border-radius:20px;box-shadow:0 25px 70px rgba(12,38,32,.2)}.modal-head{display:flex;justify-content:space-between;align-items:center;padding:20px 22px;border-bottom:1px solid var(--line);position:sticky;top:0;background:#fff;z-index:2}.modal-head h2{margin:4px 0 0;font-size:19px}.modal-head .icon-btn{border:0;background:#f4f7f6}.modal-form{padding:20px 22px}.modal-actions{display:flex;justify-content:flex-end;gap:8px;padding:15px 22px;border-top:1px solid var(--line)}.modal-view,.account-detail{padding:22px}.modal-view{text-align:center}.modal-view>.avatar{margin:0 auto 10px}.modal-view h2{margin:8px 0 3px;font-size:20px}.modal-view>p{color:var(--muted);font-size:11px}.detail-hero{display:flex;align-items:center;gap:13px;padding-bottom:20px;border-bottom:1px solid var(--line)}.detail-hero>div:nth-child(2){flex:1}.detail-hero h2{margin:3px 0;font-size:20px}.detail-sub{color:var(--muted);font-size:11px}.detail-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:0 24px;padding-top:8px}.detail-grid .info-row{display:block}.detail-grid .info-row b{display:block;text-align:left;max-width:none;margin-top:4px}.detail-actions{padding:15px 0 0;border-top:1px solid var(--line)}.request-icon,.post-cover{width:55px;height:55px;margin:0 auto 10px;border-radius:15px;background:var(--primary-soft);color:var(--primary);display:grid;place-items:center}.post-cover{width:100%;height:120px;margin-bottom:15px}.post-body{margin-top:18px;background:#f8faf9;border-radius:10px;padding:14px;text-align:left;color:#64736e;font-size:12px;line-height:1.7}.history-note{padding:12px 18px;background:#f6faf8;color:#71807b;font-size:10px;display:flex;gap:7px;align-items:center}.empty-state{padding:45px;text-align:center;color:#8a9793}.empty-state svg{display:block;margin:0 auto 10px;color:#a4b0ad}.empty-state b{display:block;color:#667570}.empty-state span{display:block;font-size:11px;margin-top:4px}
.toast{position:fixed;right:25px;bottom:25px;background:#183e36;color:#fff;padding:12px 16px;border-radius:11px;display:flex;align-items:center;gap:8px;box-shadow:0 12px 35px rgba(0,0,0,.18);z-index:200;font-size:12px}
.auth{min-height:100vh;display:grid;place-items:center;padding:24px;background:radial-gradient(circle at 10% 10%,#d9f2eb 0,#f4f8f7 38%,#edf5f2 100%)}.auth-card{width:min(430px,100%);background:#fff;border:1px solid var(--line);border-radius:22px;padding:34px;box-shadow:0 20px 60px rgba(21,65,56,.1)}.brand.center{justify-content:center;padding-bottom:22px}.auth-card h1{font-size:25px;margin:5px 0}.auth-card>p{color:var(--muted);font-size:12px;margin:0 0 22px}.auth-card .field{margin-bottom:13px}.auth-card .btn{width:100%;margin-top:5px}.auth-link{display:block;width:100%;border:0;background:transparent;color:var(--primary);font-size:11px;margin-top:13px}
@media(max-width:1050px){.sidebar{width:225px}.main{margin-left:225px}.content{padding:25px}.hero-panel{grid-template-columns:1fr}.hero-photo{min-height:220px}.stats-grid{grid-template-columns:repeat(2,1fr)}.care-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:760px){.sidebar{transform:translateX(-100%);transition:.2s;width:270px}.sidebar.open{transform:translateX(0);box-shadow:10px 0 35px rgba(0,0,0,.12)}.main{margin-left:0}.mobile-menu{display:grid;place-items:center;width:38px;height:38px}.topbar{padding:0 15px;height:64px}.breadcrumb{font-size:11px}.user-mini>div:last-child{display:none}.content{padding:20px 15px 35px}.page-head{align-items:flex-start;flex-direction:column;gap:14px}.page-head h1{font-size:23px}.page-head .btn{width:100%}.hero-copy{padding:27px}.hero-copy h2{font-size:25px}.hero-photo{min-height:180px}.stats-grid{grid-template-columns:1fr 1fr}.dashboard-grid,.profile-grid,.chat{grid-template-columns:1fr}.chat{min-height:600px}.chat-list{border-right:0;border-bottom:1px solid var(--line);display:flex;overflow:auto}.chat-contact{min-width:180px}.care-grid,.review-grid{grid-template-columns:1fr}.table-head{flex-wrap:wrap}.table-head .search{max-width:none;min-width:100%}.form-grid,.detail-grid{grid-template-columns:1fr}.detail-hero{align-items:flex-start;flex-wrap:wrap}.detail-hero .status{margin-left:auto}.modal{max-height:94vh}.modal-form{padding:17px}.top-actions{gap:4px}}
@media(max-width:460px){.stats-grid{grid-template-columns:1fr}.hero-panel{border-radius:15px}.hero-copy{padding:22px}.hero-photo{min-height:155px}.stat-card{padding:14px}.content{padding-left:12px;padding-right:12px}.filter-bar .search{min-width:100%}.care-foot{align-items:flex-start;gap:8px;flex-direction:column}.care-foot .btn{width:100%}}
.field{display:flex;flex-direction:column;gap:7px;margin-bottom:14px}
.field span{font-size:10px;font-weight:700;color:#63726e;line-height:1.3}
.field input,.field select,.field textarea{width:100%;min-height:45px;border:1px solid #dce7e3;border-radius:10px;padding:0 12px;outline:0;background:#fff;color:var(--text)}
.field input[type="file"]{height:52px;padding:7px 10px;border:1px solid #d9e5e1;border-radius:12px;background:#fff;color:#687773;font-size:13px;cursor:pointer;box-sizing:border-box}
.field input[type="file"]::file-selector-button{height:36px;padding:0 14px;margin-right:10px;border:1px solid #d5e3df;border-radius:8px;background:#f4f8f6;color:#167f76;font-size:13px;font-weight:600;cursor:pointer}
.field input[type="file"]::file-selector-button:hover{background:#e8f4f1;border-color:#bcd9d3}
.website-overview{margin-top:18px}
.website-info-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1.2fr;gap:20px;padding-top:8px}
.website-info-grid .info{min-width:0}
@media(max-width:900px){.website-info-grid{grid-template-columns:1fr 1fr}}
@media(max-width:560px){.website-info-grid{grid-template-columns:1fr}}
.website-overview{margin-top:20px;padding:24px 28px;border:1px solid #e1ebe8;border-radius:18px;background:linear-gradient(135deg,#f4fbf9 0%,#fff 65%);display:flex;align-items:center;justify-content:space-between;gap:35px}
.website-main{display:flex;align-items:flex-start;gap:16px;max-width:52%}
.website-icon{width:46px;height:46px;min-width:46px;border-radius:14px;background:#dff4ef;color:#078879;display:flex;align-items:center;justify-content:center}
.website-main h2{margin:3px 0 7px;font-size:20px;color:#173b36}
.website-main p{margin:0;color:#71827e;font-size:13px;line-height:1.6}
.website-contact{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;min-width:48%}
.website-contact>div{display:flex;align-items:center;gap:10px;padding:12px 13px;background:#fff;border:1px solid #e4ece9;border-radius:12px}
.website-contact svg{color:#078879;min-width:17px}
.website-contact span{display:flex;flex-direction:column;gap:3px;min-width:0}
.website-contact small{font-size:10px;color:#899793}
.website-contact b{font-size:11px;color:#29433e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
@media(max-width:1000px){.website-overview{flex-direction:column;align-items:stretch}.website-main{max-width:100%}.website-contact{min-width:0}}
@media(max-width:600px){.website-contact{grid-template-columns:1fr}.website-overview{padding:20px}.website-main{gap:12px}}
`}</style>;


function App() {
  const [role, setRole] = useState("family");
  const [page, setPage] = useState("dashboard");
  const [loggedIn, setLoggedIn] = useState(true);
  const [auth, setAuth] = useState("login");
  const [toast, setToast] = useState("");
  const [mobile, setMobile] = useState(false);
  const [users, setUsers] = useState(initialUsers);
  const [elderly, setElderly] = useState(initialElderly);
  const [caregivers, setCaregivers] = useState(initialCaregivers);
  const [requests, setRequests] = useState(initialRequests);
  const [schedules, setSchedules] = useState(initialSchedules);
  const [reviews, setReviews] = useState(initialReviews);
  const [posts, setPosts] = useState(initialPosts);
  const [notices, setNotices] = useState(initialNotices);
  const [emergencyContacts, setEmergencyContacts] = useState(initialEmergencyContacts);
  const [reports, setReports] = useState(initialReports);
  const [incidents, setIncidents] = useState([]);
  const [media, setMedia] = useState(initialMedia);
  const [websiteInfo, setWebsiteInfo] = useState(initialWebsiteInfo);
  const [messages, setMessages] = useState([
    { from: "Bạn", text: "Em để ý lịch ăn của mẹ chị nhé, mẹ chị bị ứng với xoài.", time: "09:24", mine: true },
    { from: "Nguyễn Thị Lan", text: "Dạ chị, em note lại rồi ạ.", time: "09:25", mine: false },
  ]);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");

  const notify = (text) => { setToast(text); setTimeout(() => setToast(""), 2600) };
  const go = (p) => { setPage(p); setMobile(false) };
  const currentNav = nav[role];

  if (!loggedIn) return <><GlobalStyles /><AuthScreen mode={auth} setMode={setAuth} onLogin={() => setLoggedIn(true)} notify={notify} /></>;

  return <><GlobalStyles /><div className="app-shell">
    <aside className={"sidebar " + (mobile ? "open" : "")}>
      <div className="brand"><div className="brand-mark"><HeartPulse /></div><div><b><span>CareConnect</span></b><small>Chăm sóc tận tâm</small></div></div>
      <div className="role-box"><span>Vai trò</span><select value={role} onChange={e => { setRole(e.target.value); go("dashboard") }}><option value="family">Người cần chăm sóc/Người thân</option><option value="caregiver">Người chăm sóc</option><option value="admin">Admin</option></select></div>
      <nav>{currentNav.map(([id, label, Icon]) => <button key={id} className={page === id ? "active" : ""} onClick={() => go(id)}><Icon size={18} /><span>{label}</span></button>)}</nav>
      <button className="logout" onClick={() => setLoggedIn(false)}><LogOut size={18} /> Đăng xuất</button>
    </aside>
    <main className="main">
      <header className="topbar"><button className="mobile-menu" onClick={() => setMobile(!mobile)}><Menu /></button><div className="breadcrumb">CareConnect <ChevronRight size={15} /><b>{currentNav.find(x => x[0] === page)?.[1] || "Tổng quan"}</b></div><div className="top-actions"><button className="icon-btn" onClick={() => go(role === "admin" ? "notifications-admin" : "notifications")}><Bell size={19} /><i /></button><button className="user-mini" onClick={() => go("profile")} title="Mở hồ sơ cá nhân"><div className="avatar">NA</div><div><b>{role === "admin" ? "Quản trị viên" : role === "caregiver" ? "Nguyễn Thị Lan" : "Nguyễn Minh An"}</b><small>{role === "admin" ? "ADMIN" : role === "caregiver" ? "NGƯỜI CHĂM SÓC" : "NGƯỜI CẦN CHĂM SÓC/NGƯỜI THÂN"}</small></div></button></div></header>
      <div className="content">{renderPage()}</div>
    </main>
    {modal && <Modal title={modal.title} onClose={() => setModal(null)}><ModalContent type={modal.type} data={selected} reviews={reviews} onSave={(data) => handleSave(modal.type, data)} onClose={() => setModal(null)} notify={notify} /></Modal>}
    {toast && <div className="toast"><CheckCircle2 size={18} />{toast}</div>}
  </div></>;

  function handleSave(type, data) {
    if (type === "elderly") { setElderly(x => selected ? x.map(a => a.id === selected.id ? { ...a, ...data } : a) : [...x, { ...data, id: Date.now() }]); }
    if (type === "care-profile") { setCaregivers(x => x.map(a => a.id === 1 ? { ...a, ...data } : a)); }
    if (type === "request") { setRequests(x => selected ? x.map(a => a.id === selected.id ? { ...a, ...data } : a) : [...x, { ...data, id: "CR-" + (1025 + x.length), registered: 0, status: "Chờ nhận đăng ký" }]); }
    if (type === "schedule") { setSchedules(x => selected ? x.map(a => a.id === selected.id ? { ...a, ...data } : a) : [...x, { ...data, id: "SC-" + (503 + x.length), owner: "Nguyễn Minh An", status: "Chờ xác nhận", checkIn: "Chưa check-in", checkOut: "Chưa check-out" }]); }
    if (type === "user") { setUsers(x => selected ? x.map(a => a.id === selected.id ? { ...a, ...data } : a) : [...x, { ...data, id: Date.now() }]); }
    if (type === "post") { setPosts(x => selected ? x.map(a => a.id === selected.id ? { ...a, ...data } : a) : [...x, { ...data, id: Date.now(), status: "Bản nháp", date: "01/10/2026", author: "Admin" }]); }
    if (type === "notice") { setNotices(x => [...x, { ...data, id: Date.now(), status: "Đã gửi", read: false }]); }
    if (type === "emergency") { setEmergencyContacts(x => selected ? x.map(a => a.id === selected.id ? { ...a, ...data } : a) : [...x, { ...data, id: Date.now() }]); }
    if (type === "media") { setMedia(x => selected ? x.map(a => a.id === selected.id ? { ...a, ...data } : a) : [...x, { ...data, id: Date.now(), status: "Đang sử dụng" }]); }
    if (type === "website-info") { setWebsiteInfo(data); }
    if (type === "review") { setReviews(x => [...x, { ...data, id: Date.now(), date: "01/10/2026", status: "Chờ duyệt" }]); }
    if (type === "incident") {
      if (!data?.reason?.trim() || !data?.detail?.trim()) { notify("Vui lòng nhập loại sự cố và mô tả chi tiết"); return; }
      setIncidents(x => [...x, { id: `SC-INC-${String(x.length + 1).padStart(3, "0")}`, scheduleId: selected.id, elderly: selected.elderly, caregiver: selected.caregiver, reason: data.reason.trim(), detail: data.detail.trim(), reporter: role === "caregiver" ? "Nguyễn Thị Lan" : "Nguyễn Minh An", createdAt: new Date().toLocaleString("vi-VN"), status: "Đã tiếp nhận" }]);
      setModal(null); notify("Đã gửi báo cáo sự cố"); return;
    }
    if (type === "report") {
      setReports(x => [...x, { ...data, id: "RP-" + String(100 + x.length + 1).padStart(3, "0"), reporter: "Nguyễn Thị Lan", status: "Chờ kiểm duyệt", date: "01/10/2026" }]);
      if (data?.requestId) setRequests(x => x.map(a => a.id === data.requestId ? { ...a, status: "Chờ kiểm duyệt" } : a));
    }
    setModal(null); notify("Đã lưu thay đổi");
  }

  // ==========================================================
  // ĐIỀU HƯỚNG THEO VAI TRÒ
  // ==========================================================
  function renderPage() {
    if (page === "dashboard") return <Dashboard role={role} go={go} websiteInfo={websiteInfo} />;
    if (page === "elderly") return <ElderlyPage data={elderly} onAdd={() => { setSelected(null); setModal({ type: "elderly", title: "Thêm thông tin người cao tuổi" }) }} onEdit={x => { setSelected(x); setModal({ type: "elderly", title: "Cập nhật thông tin người cao tuổi" }) }} onDelete={id => { setElderly(x => x.filter(a => a.id !== id)); notify("Đã xóa hồ sơ người cao tuổi") }} />;
    if (page === "emergency") return <EmergencyContactsPage data={emergencyContacts} onAdd={() => { setSelected(null); setModal({ type: "emergency", title: "Thêm người liên hệ khẩn cấp" }) }} onEdit={x => { setSelected(x); setModal({ type: "emergency", title: "Cập nhật người liên hệ khẩn cấp" }) }} onDelete={id => { setEmergencyContacts(x => x.filter(a => a.id !== id)); notify("Đã xóa liên hệ khẩn cấp") }} />;
    if (page === "elderly-admin") return <AdminElderly data={elderly} onView={x => { setSelected(x); setModal({ type: "elderly-detail", title: "Chi tiết hồ sơ người cao tuổi" }) }} onEdit={x => { setSelected(x); setModal({ type: "elderly", title: "Admin — Cập nhật thông tin" }) }} onDelete={id => { setElderly(x => x.filter(a => a.id !== id)); notify("Đã xóa thông tin") }} />;
    if (page === "emergency-admin") return <EmergencyContactsPage data={emergencyContacts} onAdd={() => { setSelected(null); setModal({ type: "emergency", title: "Admin — Thêm liên hệ khẩn cấp" }) }} onEdit={x => { setSelected(x); setModal({ type: "emergency", title: "Admin — Cập nhật liên hệ khẩn cấp" }) }} onDelete={id => { setEmergencyContacts(x => x.filter(a => a.id !== id)); notify("Đã xóa liên hệ khẩn cấp") }} />;
    if (page === "caregivers") return <CaregiversPage data={caregivers} query={query} setQuery={setQuery} onView={x => { setSelected(x); setModal({ type: "care-view", title: "Hồ sơ người chăm sóc" }) }} />;
    if (page === "care-profile") return <CareProfile c={caregivers[0]} onEdit={() => { setSelected(caregivers[0]); setModal({ type: "care-profile", title: "Cập nhật hồ sơ người chăm sóc" }) }} />;
    if (page === "care-admin") return <CareAdmin data={caregivers} onView={x => { setSelected(x); setModal({ type: "care-admin-detail", title: "Chi tiết hồ sơ người chăm sóc" }) }} onEdit={x => { setSelected(x); setModal({ type: "care-profile", title: "Chỉnh sửa hồ sơ" }) }} onVerify={id => { setCaregivers(x => x.map(a => a.id === id ? { ...a, status: "Đã xác minh" } : a)); notify("Hồ sơ đã được xác minh") }} onSupplement={id => { setCaregivers(x => x.map(a => a.id === id ? { ...a, status: "Cần bổ sung" } : a)); notify("Đã yêu cầu bổ sung hồ sơ") }} onToggle={x => { const next = x.status === "Bị khóa" ? "Hoạt động" : x.status === "Đã xác minh" ? "Hoạt động" : "Bị khóa"; setCaregivers(c => c.map(a => a.id === x.id ? { ...a, status: next } : a)); notify(next === "Bị khóa" ? "Đã khóa hồ sơ" : "Đã kích hoạt/mở khóa hồ sơ") }} onDelete={id => { setCaregivers(c => c.map(a => a.id === id ? { ...a, status: "Đã xóa" } : a)); notify("Hồ sơ đã được đánh dấu đã xóa") }} />;
    if (page === "requests" || page === "requests-admin") return <RequestsPage role={role} admin={page === "requests-admin"} data={requests}
      onAdd={() => { setSelected(null); setModal({ type: "request", title: "Tạo yêu cầu chăm sóc" }) }}
      onView={x => { setSelected(x); setModal({ type: "request-detail", title: "Chi tiết yêu cầu chăm sóc" }) }}
      onEdit={x => { setSelected(x); setModal({ type: "request", title: "Cập nhật yêu cầu chăm sóc" }) }}
      onDelete={id => { setRequests(x => x.filter(a => a.id !== id)); notify("Đã hủy yêu cầu") }}
      onRegister={id => {
        setRequests(x => x.map(a => a.id === id ? { ...a, registered: a.registered + 1, isApplied: true, status: a.status === "Chờ nhận đăng ký" ? "Có người đăng ký" : a.status } : a));
        notify("Đã đăng ký nhận yêu cầu");
      }}
      onCancelRegister={id => {
        setRequests(x => x.map(a => { if (a.id !== id) return a; const registered = Math.max(0, a.registered - 1); return { ...a, registered, isApplied: false, status: registered === 0 && a.status === "Có người đăng ký" ? "Chờ nhận đăng ký" : a.status }; }));
        notify("Đã hủy đăng ký nhận yêu cầu");
      }}
      onAccept={id => { setRequests(x => x.map(a => a.id === id ? { ...a, status: "Đã chọn người chăm sóc" } : a)); notify("Đã chọn người chăm sóc") }}
      onFinalize={id => { setRequests(x => x.map(a => a.id === id ? { ...a, status: "Đang chờ thực hiện" } : a)); notify("Đã chốt yêu cầu") }}
      onReject={id => { setRequests(x => x.map(a => a.id === id ? { ...a, registered: Math.max(0, a.registered - 1), status: "Có người đăng ký" } : a)); notify("Đã từ chối người chăm sóc") }}
      onViewApplicants={x => { setSelected(x); setModal({ type: "request-applicants", title: "Người chăm sóc đã đăng ký" }) }}
      onReport={x => { setSelected(x); setModal({ type: "report", title: `Báo cáo yêu cầu ${x.id}` }) }}
      onManageReports={() => go("reports-admin")}
      notify={notify} />;
    if (page === "schedules" || page === "schedules-admin") return <SchedulesPage role={role} admin={page === "schedules-admin"} data={schedules} incidents={incidents}
      onIncident={x => { setSelected(x); setModal({ type: "incident", title: `Báo cáo sự cố - ${x.id}` }) }}
      onAdd={() => { setSelected(null); setModal({ type: "schedule", title: "Tạo lịch chăm sóc" }) }}
      onView={x => { setSelected(x); setModal({ type: "schedule-detail", title: "Chi tiết lịch chăm sóc" }) }}
      onEdit={x => { setSelected(x); setModal({ type: "schedule", title: "Cập nhật lịch chăm sóc" }) }}
      onCancel={id => { setSchedules(x => x.map(a => a.id === id ? { ...a, status: "Đã hủy" } : a)); notify("Đã hủy lịch chăm sóc") }}
      onRejectSchedule={id => { setSchedules(x => x.map(a => a.id === id ? { ...a, status: "Bị từ chối" } : a)); notify("Đã từ chối lịch chăm sóc") }}
      onConfirmComplete={id => {
        const sc = schedules.find(a => a.id === id);
        if (!sc || sc.status !== "Chờ xác nhận hoàn thành") return;
        setSchedules(x => x.map(a => a.id === id ? { ...a, status: "Hoàn thành" } : a));
        notify("Gia đình đã xác nhận ca chăm sóc hoàn thành");
      }}
      onConfirmIncomplete={id => {
        const sc = schedules.find(a => a.id === id);
        if (!sc || sc.status !== "Chờ xác nhận hoàn thành") return;
        setSchedules(x => x.map(a => a.id === id ? { ...a, status: "Chưa hoàn thành" } : a));
        notify("Đã ghi nhận ca chăm sóc chưa hoàn thành");
      }}
      onStatus={id => {
        const sc = schedules.find(a => a.id === id);
        if (!sc || role !== "caregiver" || sc.caregiver !== "Nguyễn Thị Lan") return;
        const transitions = {
          "Chờ xác nhận": ["Đã xác nhận", "Đã nhận lịch chăm sóc"],
          "Đã xác nhận": ["Đang chăm sóc", "Check-in thành công, ca chăm sóc đã bắt đầu"],
          "Đang chăm sóc": ["Chờ xác nhận hoàn thành", "Check-out thành công, đang chờ gia đình xác nhận hoàn thành"]
        };
        const transition = transitions[sc.status];
        if (!transition) return;
        const [nextStatus, message] = transition;
        const timeNow = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: false });
        setSchedules(x => x.map(a => a.id === id ? {
          ...a, status: nextStatus,
          checkIn: nextStatus === "Đang chăm sóc" ? timeNow : a.checkIn,
          checkOut: nextStatus === "Chờ xác nhận hoàn thành" ? timeNow : a.checkOut
        } : a));
        notify(message);
      }}
      onReview={x => { setSelected({ caregiver: x.caregiver }); setModal({ type: "review", title: `Đánh giá: ${x.caregiver}` }) }} // <-- BỔ SUNG DÒNG NÀY
      notify={notify} />;
    if (page === "messages") return <MessagesPage messages={messages} setMessages={setMessages} />;
    if (page === "notifications") return <NotificationsPage data={notices} />;
    if (page === "profile") return <ProfilePage role={role} onSave={notify} />;
    if (page === "security") return <SecurityPage onSave={notify} />;
    if (page === "users") return <UsersPage data={users} query={query} setQuery={setQuery} onAdd={() => { setSelected(null); setModal({ type: "user", title: "Thêm tài khoản" }) }} onView={x => { setSelected(x); setModal({ type: "user-detail", title: "Chi tiết tài khoản" }) }} onEdit={x => { setSelected(x); setModal({ type: "user", title: "Sửa tài khoản" }) }} onDelete={id => { setUsers(x => x.filter(a => a.id !== id)); notify("Đã xóa tài khoản") }} onToggle={x => { const next = x.status === "Khóa" ? "Hoạt động" : "Khóa"; setUsers(u => u.map(a => a.id === x.id ? { ...a, status: next } : a)); notify(next === "Khóa" ? "Đã khóa tài khoản" : "Đã mở khóa tài khoản") }} onRole={(id, roleName) => { setUsers(u => u.map(a => a.id === id ? { ...a, role: roleName } : a)); notify("Đã cập nhật phân quyền") }} notify={notify} />;
    if (page === "reviews") return <ReviewsPage role={role} data={reviews} schedules={schedules} onAdd={(name) => { setSelected({ caregiver: name }); setModal({ type: "review", title: `Đánh giá: ${name}` }) }} />;
    if (page === "reviews-admin") return <AdminReviews data={reviews} onApprove={id => { setReviews(x => x.map(a => a.id === id ? { ...a, status: "Đã duyệt" } : a)); notify("Đã duyệt đánh giá") }} onDelete={id => { setReviews(x => x.filter(a => a.id !== id)); notify("Đã xóa đánh giá") }} />;
    if (page === "notifications-admin") return <AdminNotifications data={notices} onAdd={() => { setSelected(null); setModal({ type: "notice", title: "Tạo thông báo" }) }} onEdit={x => { setSelected(x); setModal({ type: "notice", title: "Cập nhật thông báo" }) }} onDelete={id => { setNotices(x => x.filter(a => a.id !== id)); notify("Đã xóa thông báo") }} />;
    if (page === "content") return <ContentPage data={posts} onAdd={() => { setSelected(null); setModal({ type: "post", title: "Thêm bài viết" }) }} onView={x => { setSelected(x); setModal({ type: "post-detail", title: "Xem bài viết" }) }} onEdit={x => { setSelected(x); setModal({ type: "post", title: "Sửa bài viết" }) }} onDelete={id => { setPosts(x => x.filter(a => a.id !== id)); notify("Đã xóa bài viết") }} />;
    if (page === "reports-admin") return <ReportsAdmin data={reports} onApprove={id => { const rp = reports.find(a => a.id === id); setReports(x => x.map(a => a.id === id ? { ...a, status: "Đã xử lý" } : a)); if (rp) setRequests(x => x.map(a => a.id === rp.requestId ? { ...a, status: "Đang thực hiện", moderation: "Yêu cầu hợp lệ" } : a)); notify("Đã kiểm duyệt: yêu cầu hợp lệ và được chuyển sang đang thực hiện") }} onReject={id => { const rp = reports.find(a => a.id === id); setReports(x => x.map(a => a.id === id ? { ...a, status: "Đã xử lý" } : a)); if (rp) setRequests(x => x.map(a => a.id === rp.requestId ? { ...a, status: "Bị từ chối", moderation: "Yêu cầu không hợp lệ" } : a)); notify("Đã kiểm duyệt: yêu cầu không hợp lệ") }} onDelete={id => { setReports(x => x.filter(a => a.id !== id)); notify("Đã xóa báo cáo") }} />;
    if (page === "media-admin") return <MediaWebsitePage media={media} websiteInfo={websiteInfo} onMediaAdd={() => { setSelected(null); setModal({ type: "media", title: "Thêm hình ảnh" }) }} onMediaEdit={x => { setSelected(x); setModal({ type: "media", title: "Cập nhật hình ảnh" }) }} onMediaDelete={id => { setMedia(x => x.filter(a => a.id !== id)); notify("Đã xóa hình ảnh") }} onWebsiteEdit={() => { setSelected(websiteInfo); setModal({ type: "website-info", title: "Cập nhật thông tin website" }) }} />;
    if (page === "analytics") return <AnalyticsPage users={users} elderly={elderly} caregivers={caregivers} requests={requests} schedules={schedules} reviews={reviews} />;
    return <Dashboard role={role} go={go} />;
  }
}

function PageHeader({ eyebrow, title, desc, action }) { return <div className="page-head"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{desc}</p></div>{action}</div> }
function Button({ children, onClick, kind = "", icon: Icon = Plus }) { return <button className={"btn " + kind} onClick={onClick}>{Icon && <Icon size={17} />} {children}</button> }
function Status({ children }) { const s = String(children); return <span className={"status " + (s.includes("Chờ") || s.includes("Cần bổ sung") ? "warning" : s.includes("Khóa") || s.includes("Từ chối") || s.includes("không hợp lệ") ? "danger" : s.includes("Hoàn") || s.includes("xác minh") || s.includes("Hoạt") || s.includes("Đã xử lý") ? "success" : "info")}>{children}</span> }
function Stat({ icon: Icon, label, value, sub }) { return <div className="stat-card"><div className="stat-icon"><Icon /></div><div><span>{label}</span><strong>{value}</strong><small>{sub}</small></div></div> }

// ============================================================
// CHỨC NĂNG CHUNG - DASHBOARD
// ============================================================
function Dashboard({ role, go, websiteInfo }) {
  const stats = role === "admin" ? [
    [Users, "Tổng tài khoản", "1,248", "+8.4% tháng này"], [UserCheck, "Người chăm sóc", "326", "+12 hồ sơ mới"], [ClipboardList, "Yêu cầu chăm sóc", "184", "32 đang xử lý"], [CalendarDays, "Lịch đã hoàn thành", "892", "+6.2%"]
  ] : role === "caregiver" ? [
    [ClipboardList, "Yêu cầu phù hợp", "18", "6 yêu cầu mới"], [CalendarDays, "Lịch tuần này", "12", "2 đang chờ"], [Star, "Điểm đánh giá", "4.9/5", "86 đánh giá"], [HeartPulse, "Ca đã hoàn thành", "124", "+9 ca tháng này"]
  ] : [
    [HeartPulse, "Người cao tuổi", "2", "1 hồ sơ cần theo dõi"], [ClipboardList, "Yêu cầu đang mở", "2", "1 đang chờ"], [CalendarDays, "Lịch sắp tới", "4", "Lịch gần nhất 04/10"], [MessageCircle, "Tin nhắn mới", "3", "2 từ người chăm sóc"]
  ];

  return <><PageHeader eyebrow="CAREHEALTH" title={role === "admin" ? "Xin chào, Quản trị viên" : role === "caregiver" ? "Xin chào, Nguyễn Thị Lan" : "Xin chào, Nguyễn Minh An"} desc="Quản lý dịch vụ chăm sóc người cao tuổi một cách an toàn và thuận tiện." action={<Button onClick={() => go(role === "admin" ? "users" : "requests")}>{role === "admin" ? "Quản lý tài khoản" : "Tạo yêu cầu chăm sóc"}</Button>} />
    <section className="hero-panel">
      <div className="hero-copy"><span className="hero-kicker">CHĂM SÓC AN TOÀN • TẬN TÂM • MINH BẠCH</span><h2>Đồng hành cùng gia đình<br />trong từng khoảnh khắc.</h2><p>CareConnect kết nối gia đình với người chăm sóc phù hợp, giúp theo dõi lịch trình và chất lượng chăm sóc dễ dàng hơn.</p><div className="hero-pills"><span>✓ Hồ sơ được kiểm duyệt</span><span>✓ Theo dõi lịch chăm sóc</span></div></div><div className="hero-photo"><img src={imageAssets.hero} alt="Chăm sóc sức khỏe" /><div className="hero-badge"><HeartPulse size={17} /><div><b>CareConnect Care</b><small>Chăm sóc tận tâm mỗi ngày</small></div></div></div>
    </section>
    <div className="stats-grid">{stats.map(([i, l, v, s]) => <Stat key={l} icon={i} label={l} value={v} sub={s} />)}</div>
    <div className="dashboard-grid">
      <div className="card"><div className="card-title"><div><h2>{role === "admin" ? "Tình hình hệ thống" : "Lịch chăm sóc gần nhất"}</h2><p>Cập nhật theo dữ liệu demo</p></div><button className="link-btn" onClick={() => go("schedules")}>Xem tất cả</button></div><div className="mini-list">{[["04/10", "08:00 - 12:00", "Nguyễn Văn Bình", "Nguyễn Thị Lan", "Đã xác nhận"], ["05/10", "13:00 - 17:00", "Trần Thị Hoa", "Trần Minh Anh", "Đang thực hiện"], ["06/10", "08:00 - 11:00", "Nguyễn Văn Bình", "Chưa phân công", "Đang tìm"]].map(x => <div className="mini-row" key={x[0]}><div className="date-box"><b>{x[0].split("/")[0]}</b><small>TH10</small></div><div><b>{x[2]}</b><span>{x[1]} · {x[3]}</span></div><Status>{x[4]}</Status></div>)}</div></div>
      <div className="card quick"><h2>Thao tác nhanh</h2>{(role === "admin" ? [[Users, "Quản lý tài khoản", "users"], [UserCheck, "Kiểm duyệt người chăm sóc", "care-admin"], [BookOpen, "Quản lý bài viết", "content"], [BarChart3, "Xem thống kê", "analytics"]] : role === "caregiver" ? [[ClipboardList, "Tìm yêu cầu phù hợp", "requests"], [CalendarDays, "Lịch chăm sóc", "schedules"], [UserCheck, "Cập nhật hồ sơ", "care-profile"], [MessageCircle, "Nhắn tin", "messages"]] : [[HeartPulse, "Quản lý hồ sơ người cao tuổi", "elderly"], [UserRoundPlus, "Tìm người chăm sóc", "caregivers"], [ClipboardList, "Tạo yêu cầu chăm sóc", "requests"], [CalendarDays, "Xem lịch chăm sóc", "schedules"]]).map(([I, t, p]) => <button key={t} onClick={() => go(p)}><I size={20} /><span>{t}</span><ChevronRight size={16} /></button>)}</div>
    </div>
    <div className="website-overview">
      <div className="website-main">
        <div className="website-icon"><HeartPulse size={22} /></div>
        <div><span className="eyebrow">VỀ CARECONNECT</span><h2>{websiteInfo?.siteName || "CareConnect"}</h2><p>{websiteInfo?.introduction || "Nền tảng kết nối người cần chăm sóc người cao tuổi với người chăm sóc phù hợp."}</p></div>
      </div>
      <div className="website-contact">
        <div><Phone size={17} /><span><small>Điện thoại</small><b>{websiteInfo?.phone || "0934791106"}</b></span></div>
        <div><Mail size={17} /><span><small>Email</small><b>{websiteInfo?.email || "support@careconnect.vn"}</b></span></div>
        <div><MapPin size={17} /><span><small>Địa chỉ</small><b>{websiteInfo?.address || "TP. Huế, Thừa Thiên Huế"}</b></span></div>
      </div>
    </div>
  </>;
}

// ============================================================
// NGƯỜI CẦN CHĂM SÓC / NGƯỜI THÂN
// ============================================================
function ElderlyPage({ data, onAdd, onEdit, onDelete }) { return <><PageHeader eyebrow="HỒ SƠ" title="Thông tin người cao tuổi" desc="Thêm, xem, cập nhật và xóa hồ sơ người cao tuổi." action={<Button onClick={onAdd}>Thêm hồ sơ</Button>} /><div className="card table-card"><TableHead placeholder="Tìm theo tên, quan hệ..." /><table><thead><tr><th>Người cao tuổi</th><th>Tuổi</th><th>Quan hệ</th><th>Sức khỏe</th><th>Liên hệ</th><th>Thao tác</th></tr></thead><tbody>{data.map(x => <tr key={x.id}><td><b>{x.name}</b><small>{x.address}</small></td><td>{x.age}</td><td>{x.relation}</td><td><Status>{x.health}</Status></td><td>{x.phone}</td><td><ActionButtons onView={() => onEdit(x)} onEdit={() => onEdit(x)} onDelete={() => onDelete(x.id)} /></td></tr>)}</tbody></table></div></> }
// Gợi ý sửa component AdminElderly
// ============================================================
// ADMIN - QUẢN LÝ NGƯỜI CAO TUỔI
// ============================================================
function AdminElderly({ data, onView, onEdit, onDelete }) {
  return (
    <>
      <PageHeader eyebrow="ADMIN" title="Quản lý người cao tuổi" desc="Xem danh sách, chi tiết, cập nhật và xóa thông tin người cao tuổi." />
      <div className="card table-card">
        <TableHead placeholder="Tìm người cao tuổi..." />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Họ tên</th>
              <th>Tuổi</th>
              <th>Tài khoản quản lý</th>
              <th>Sức khỏe</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.map(x => (
              <tr key={x.id}>
                <td>#{x.id}</td>
                <td><b>{x.name}</b></td>
                <td>{x.age}</td>
                <td><span className="role-pill">Nguyễn Minh An</span></td>
                <td><Status>{x.health}</Status></td>
                {/* ĐÃ SỬA: onView={() => onView(x)} */}
                <td><ActionButtons onView={() => onView(x)} onEdit={() => onEdit(x)} onDelete={() => onDelete(x.id)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
function CaregiversPage({ data, query, setQuery, onView }) { const filtered = data.filter(x => (x.name + x.area + x.skills).toLowerCase().includes(query.toLowerCase())); return <><PageHeader eyebrow="DỊCH VỤ" title="Tìm người chăm sóc" desc="Tìm kiếm, lọc và xem hồ sơ người chăm sóc phù hợp." /><div className="filter-bar"><div className="search"><Search /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Tìm theo tên, khu vực, kỹ năng..." /></div><button className="filter-btn"><Filter /> Khu vực</button><button className="filter-btn"><Filter /> Kinh nghiệm</button><button className="filter-btn"><Filter /> Thời gian</button></div><div className="care-grid">{filtered.map(c => <div className="care-card" key={c.id}><div className="care-top"><div className="avatar big photo-avatar"><img src={caregiverImage(c.id)} alt={c.name} /></div><Status>{c.status}</Status></div><h3>{c.name}</h3><p>{c.area} · {c.exp} kinh nghiệm</p><div className="rating"><Star fill="currentColor" size={16} /> {c.rating} <span>({c.reviews} đánh giá)</span></div><div className="chips">{c.skills.split(", ").map(s => <span key={s}>{s}</span>)}</div><div className="care-foot"><span><Clock3 size={15} /> {c.time}</span><Button kind="outline" icon={Eye} onClick={() => onView(c)}>Xem hồ sơ</Button></div></div>)}</div></> }
// ============================================================
// NGƯỜI CHĂM SÓC
// ============================================================
function CareProfile({ c, onEdit }) { return <><PageHeader eyebrow="HỒ SƠ" title="Hồ sơ người chăm sóc" desc="Quản lý kinh nghiệm, kỹ năng, khu vực và thời gian làm việc." action={<Button onClick={onEdit} icon={Edit3}>Cập nhật hồ sơ</Button>} /><div className="profile-grid"><div className="card profile-card"><div className="profile-cover"></div><div className="profile-body"><div className="avatar huge photo-avatar"><img src={imageAssets.caregiver1} alt={c.name} /></div><h2>{c.name}</h2><p>{c.area} · {c.exp} kinh nghiệm</p><div className="rating"><Star fill="currentColor" /> {c.rating} / 5 · {c.reviews} đánh giá</div></div></div><div className="card info-card"><h2>Thông tin dịch vụ</h2><Info label="Kỹ năng" value={c.skills} /><Info label="Chứng chỉ" value={c.certificate || "Chưa cập nhật"} /><Info label="Mức giá" value={c.price || "Chưa cập nhật"} /><Info label="Phạm vi công việc" value={c.scope || "Chưa cập nhật"} /><Info label="Thời gian làm việc" value={c.time} /><Info label="Lịch rảnh" value={c.availability || "Chưa cập nhật"} /><Info label="Trạng thái kiểm duyệt" value={c.status} /><Info label="Ca đã hoàn thành" value="124 ca" /></div></div></> }
// ============================================================
// ADMIN - QUẢN LÝ NGƯỜI CHĂM SÓC
// ============================================================
function CareAdmin({ data, onView, onEdit, onVerify, onSupplement, onToggle, onDelete }) {
  return (
    <>
      <PageHeader eyebrow="ADMIN" title="Quản lý người chăm sóc" desc="Xem, chỉnh sửa và kiểm duyệt hồ sơ người chăm sóc." />
      <div className="card table-card"><TableHead placeholder="Tìm người chăm sóc..." /><table><thead><tr><th>Hồ sơ</th><th>Kinh nghiệm</th><th>Khu vực</th><th>Đánh giá</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>
        {data.map(x => <tr key={x.id}>
          <td><b>{x.name}</b><small>{x.skills}</small></td><td>{x.exp}</td><td>{x.area}</td><td>⭐ {x.rating}</td><td><Status>{x.status}</Status></td>
          <td><div className="actions">
            {x.status === "Chờ xác minh" && <><button className="action success" title="Duyệt hồ sơ" onClick={() => onVerify(x.id)}><Check size={16} /></button><button className="action warning-action" title="Yêu cầu bổ sung hồ sơ" onClick={() => onSupplement(x.id)}><Edit3 size={16} /></button></>}
            {x.status === "Đã xác minh" && <button className="action success" title="Kích hoạt tài khoản" onClick={() => onToggle(x)}><CheckCircle2 size={16} /></button>}
            {(x.status === "Hoạt động" || x.status === "Bị khóa") && <button className={"action " + (x.status === "Bị khóa" ? "success" : "warning-action")} title={x.status === "Bị khóa" ? "Mở khóa" : "Khóa hồ sơ"} onClick={() => onToggle(x)}>{x.status === "Bị khóa" ? <LockOpen size={16} /> : <Lock size={16} />}</button>}
            {x.status !== "Đã xóa" && <button className="action danger" title="Xóa hồ sơ" onClick={() => { if (window.confirm(`Xóa hồ sơ ${x.name}?`)) onDelete(x.id) }}><Trash2 size={16} /></button>}
            <button className="action" title="Chỉnh sửa" onClick={() => onEdit(x)}><Edit3 size={16} /></button><button className="action" title="Xem chi tiết" onClick={() => onView(x)}><Eye size={16} /></button>
          </div></td>
        </tr>)}
      </tbody></table></div>
    </>
  );
}
// ============================================================
// YÊU CẦU CHĂM SÓC - FAMILY / CAREGIVER / ADMIN
// Quyền thao tác thay đổi theo role
// ============================================================
function RequestsPage({ role, admin, data, onAdd, onView, onEdit, onDelete, onRegister, onCancelRegister, onAccept, onFinalize, onReject, onViewApplicants, onReport, onManageReports, notify }) {
  return (
    <>
      <PageHeader
        eyebrow={admin ? "ADMIN • YÊU CẦU" : role === "caregiver" ? "CÔNG VIỆC" : "DỊCH VỤ"}
        title={admin ? "Quản lý yêu cầu chăm sóc" : role === "caregiver" ? "Tìm yêu cầu chăm sóc" : "Yêu cầu của tôi"}
        desc={admin ? "Quản lý, xem chi tiết và xử lý vi phạm trên hệ thống." : role === "caregiver" ? "Xem danh sách các gia đình đang cần người chăm sóc và đăng ký nhận việc." : "Tạo mới, theo dõi trạng thái và chọn người chăm sóc cho gia đình."}
        /* ĐÃ SỬA LỖI TẠI ĐÂY: Trả lại đúng nút Tạo yêu cầu */
        action={!admin && role !== "caregiver" && <Button onClick={onAdd}>Tạo yêu cầu</Button>}
      />

      <div className="card table-card">
        <TableHead placeholder="Tìm mã yêu cầu, người cao tuổi, nhu cầu..." />
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Mã</th><th>Người cao tuổi</th><th>Nhu cầu</th><th>Thời gian</th><th>Đăng ký</th><th>Trạng thái</th><th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {data.map(x => (
                <tr key={x.id}>
                  <td><b>{x.id}</b></td>
                  <td>{x.elderly}<small>{x.location}</small></td>
                  <td>{x.type}</td>
                  <td>{x.date}<small>{x.time}</small></td>
                  <td><span className="count-badge">{x.registered} người</span></td>
                  <td><Status>{x.status}</Status></td>
                  <td>
                    <div className="actions">
                      {/* Nút Xem chi tiết yêu cầu (ai cũng xem được) */}
                      <button className="action" title="Xem chi tiết yêu cầu" onClick={() => onView(x)}>
                        <Eye size={16} />
                      </button>

                      {/* --- THAO TÁC CỦA NGƯỜI THÂN --- */}
                      {!admin && role !== "caregiver" && (
                        <>
                          {!["Đã chọn người chăm sóc", "Đang chờ thực hiện", "Đang thực hiện", "Chờ kiểm duyệt", "Đã hoàn thành", "Bị từ chối", "Đã hủy"].includes(x.status) && (
                            <button className="action" title="Cập nhật" onClick={() => onEdit(x)}>
                              <Edit3 size={16} />
                            </button>
                          )}
                          <button className="action danger" title="Hủy yêu cầu" onClick={() => { if (window.confirm(`Hủy yêu cầu ${x.id}?`)) onDelete(x.id) }}>
                            <X size={16} />
                          </button>

                          {x.registered > 0 && ["Có người đăng ký", "Chờ nhận đăng ký"].includes(x.status) && (
                            <button className="action success" title="Xem danh sách người chăm sóc đã đăng ký" onClick={() => onViewApplicants(x)}>
                              <Users size={16} />
                            </button>
                          )}
                        </>
                      )}

                      {/* --- THAO TÁC CỦA NGƯỜI CHĂM SÓC --- */}
                      {role === "caregiver" && ["Chờ nhận đăng ký", "Có người đăng ký"].includes(x.status) && (
                        <button
                          className={"action " + (x.isApplied ? "warning-action" : "success")}
                          title={x.isApplied ? "Hủy đăng ký nhận ca này" : "Đăng ký nhận ca này"}
                          onClick={() => x.isApplied ? onCancelRegister(x.id) : onRegister(x.id)}
                        >
                          {x.isApplied ? <X size={16} /> : <UserCheck size={16} />}
                        </button>
                      )}

                      {role === "caregiver" && ["Chờ nhận đăng ký", "Có người đăng ký"].includes(x.status) && (
                        <button className="action warning-action" title="Báo cáo vi phạm" onClick={() => onReport(x)}>
                          <ShieldCheck size={16} />
                        </button>
                      )}
                      {!admin && role !== "caregiver" && x.status === "Đã chọn người chăm sóc" && (
                        <button className="action success" title="Chốt yêu cầu" onClick={() => onFinalize(x.id)}>
                          <Check size={16} />
                        </button>
                      )}

                      {/* --- THAO TÁC CỦA ADMIN --- */}
                      {admin && (
                        <button className="action danger" title="Xử lý yêu cầu vi phạm" onClick={onManageReports}>
                          <ShieldCheck size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ============================================================
// LỊCH CHĂM SÓC - FAMILY / CAREGIVER / ADMIN
// ============================================================
function SchedulesPage({ role, admin, data, incidents, onIncident, onAdd, onView, onEdit, onCancel, onRejectSchedule, onConfirmComplete, onConfirmIncomplete, onStatus, notify }) {
  const [viewMode, setViewMode] = useState("current");
  const [historyQuery, setHistoryQuery] = useState("");
  const [historyStatus, setHistoryStatus] = useState("all");
  const [historyMonth, setHistoryMonth] = useState("all");
  // Demo identity. Production must derive this from authenticated server session.
  const demoName = role === "caregiver" ? "Nguyễn Thị Lan" : "Nguyễn Minh An";
  const ownSchedules = admin ? data : data.filter(x => role === "caregiver" ? x.caregiver === demoName : x.owner === demoName);
  const finishedStatuses = ["Hoàn thành", "Chưa hoàn thành", "Đã hủy", "Bị từ chối"];
  const history = ownSchedules.filter(x => finishedStatuses.includes(x.status));
  const shownHistory = history.filter(x => {
    const matchText = [x.id, x.elderly, x.caregiver, x.date, x.status].join(" ").toLowerCase().includes(historyQuery.trim().toLowerCase());
    const matchStatus = historyStatus === "all" || x.status === historyStatus;
    const matchMonth = historyMonth === "all" || x.date.slice(3) === historyMonth;
    return matchText && matchStatus && matchMonth;
  }).sort((a, b) => {
    const parse = v => { const [d,m,y] = v.split("/").map(Number); return new Date(y,m-1,d).getTime(); };
    return parse(b.date) - parse(a.date);
  });
  return (
    <>
      <PageHeader
        eyebrow={admin ? "ADMIN • LỊCH" : "LỊCH CHĂM SÓC"}
        title={admin ? "Quản lý lịch chăm sóc" : "Lịch chăm sóc"}
        desc="Tạo, xem chi tiết, cập nhật, hủy và theo dõi tiến độ thực hiện lịch chăm sóc."
        action={!admin && role !== "caregiver" && <Button onClick={onAdd}>Tạo lịch</Button>}
      />
      <div className="actions-row" style={{ marginBottom: 18, flexWrap: "wrap" }}>
        <Button kind={viewMode === "current" ? undefined : "outline"} icon={CalendarDays} onClick={() => setViewMode("current")}>Lịch chăm sóc</Button>
        <Button kind={viewMode === "history" ? undefined : "outline"} icon={Clock3} onClick={() => setViewMode("history")}>Xem lịch sử chăm sóc ({history.length})</Button>
      </div>
      {viewMode === "history" ? <div className="card table-card">
        <div className="section-head"><div><h2>Lịch sử chăm sóc</h2><p>Các ca đã kết thúc thuộc {admin ? "hệ thống" : "tài khoản đang sử dụng"}.</p></div><span className="count-badge">{shownHistory.length} kết quả</span></div>
        <div className="table-head" style={{ flexWrap: "wrap" }}>
          <div className="search"><Search size={16}/><input aria-label="Tìm lịch sử chăm sóc" placeholder="Tìm mã lịch, người cao tuổi, người chăm sóc..." value={historyQuery} onChange={e => setHistoryQuery(e.target.value)} /></div>
          <select className="filter-select" aria-label="Lọc trạng thái lịch sử" value={historyStatus} onChange={e => setHistoryStatus(e.target.value)}><option value="all">Tất cả trạng thái</option>{finishedStatuses.map(v => <option key={v} value={v}>{v}</option>)}</select>
          <select className="filter-select" aria-label="Lọc tháng lịch sử" value={historyMonth} onChange={e => setHistoryMonth(e.target.value)}><option value="all">Tất cả tháng</option>{[...new Set(history.map(x => x.date.slice(3)))].sort().reverse().map(v => <option key={v} value={v}>{v}</option>)}</select>
        </div>
        <div className="table-scroll"><table><thead><tr><th>Mã lịch</th><th>Ngày / Giờ</th><th>Người cao tuổi</th><th>Người chăm sóc</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>
          {shownHistory.map(x => <tr key={x.id}><td><b>{x.id}</b></td><td>{x.date}<small>{x.time}</small></td><td>{x.elderly}</td><td>{x.caregiver || "Chưa phân công"}</td><td><Status>{x.status}</Status></td><td><button type="button" className="action" title={`Xem lịch sử ${x.id}`} aria-label={`Xem lịch sử ${x.id}`} onClick={() => onView(x)}><Eye size={16}/></button></td></tr>)}
        </tbody></table>{shownHistory.length === 0 && <div className="empty-state"><Clock3 size={30}/><b>Không có lịch sử chăm sóc</b><span>Không tìm thấy ca đã kết thúc phù hợp với bộ lọc.</span></div>}</div>
      </div> : <div className="card table-card">
        <div className="calendar-toolbar">
          <button>‹</button><h3>Tháng 10, 2026</h3><button>›</button>
          <button className="filter-btn"><Filter /> Bộ lọc</button>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr><th>Lịch</th><th>Người cao tuổi</th><th>Người chăm sóc</th><th>Trạng thái</th><th>Thao tác</th></tr>
            </thead>
            <tbody>
              {ownSchedules.map(x => (
                <tr key={x.id}>
                  <td><b>{x.date}</b><small>{x.time}</small></td>
                  <td>{x.elderly}</td>
                  <td>{x.caregiver}</td>
                  <td><Status>{x.status}</Status></td>
                  <td>
                    <div className="actions">
                      {/* Nút Xem chi tiết: Ai cũng bấm được để xem lịch sử */}
                      <button className="action" title="Xem chi tiết lịch" onClick={() => onView(x)}>
                        <Eye size={16} />
                      </button>

                      {/* Nút của Người thân (Family) */}
                      {!admin && role !== "caregiver" && !["Hoàn thành", "Chưa hoàn thành", "Đã hủy", "Bị từ chối", "Chờ xác nhận hoàn thành"].includes(x.status) && (
                        <>
                          <button className="action" title="Cập nhật thông tin lịch" onClick={() => onEdit(x)}><Edit3 size={16} /></button>
                          <button className="action danger" title="Hủy lịch" onClick={() => { if (window.confirm(`Hủy lịch ${x.id}?`)) onCancel(x.id) }}><X size={16} /></button>
                        </>
                      )}
                      {!admin && role !== "caregiver" && x.status === "Chờ xác nhận hoàn thành" && (
                        <>
                          <button type="button" className="btn" style={{ minHeight: 34, padding: "0 11px", fontSize: 11 }} title="Gia đình xác nhận hoàn thành ca chăm sóc" onClick={() => onConfirmComplete(x.id)}><Check size={15} /> Xác nhận hoàn thành</button>
                          <button type="button" className="btn outline" style={{ minHeight: 34, padding: "0 11px", fontSize: 11, color: "#c44d56", borderColor: "#f0cbd0" }} title="Xác nhận chưa hoàn thành" onClick={() => onConfirmIncomplete(x.id)}><X size={15} /> Chưa hoàn thành</button>
                        </>
                      )}

                      {/* Nút của Người chăm sóc (Caregiver) */}
                      {role === "caregiver" && ["Chờ xác nhận", "Đã xác nhận", "Đang chăm sóc"].includes(x.status) && (
                        <>
                          <button type="button" className="btn" style={{ minHeight: 34, padding: "0 11px", fontSize: 11 }}
                            title={x.status === "Chờ xác nhận" ? "Nhận lịch chăm sóc" : x.status === "Đã xác nhận" ? "Check-in để bắt đầu chăm sóc" : "Check-out và chờ người thân xác nhận"}
                            aria-label={x.status === "Chờ xác nhận" ? "Nhận lịch" : x.status === "Đã xác nhận" ? "Check-in" : "Check-out"}
                            onClick={() => onStatus(x.id)}>
                            {x.status === "Chờ xác nhận" ? <Check size={15} /> : <Clock3 size={15} />}
                            {x.status === "Chờ xác nhận" ? "Nhận lịch" : x.status === "Đã xác nhận" ? "Check-in" : "Check-out"}
                          </button>
                          {x.status === "Chờ xác nhận" && <button className="action danger" title="Từ chối lịch" onClick={() => onRejectSchedule(x.id)}><X size={16} /></button>}
                        </>
                      )}
                      {role === "caregiver" && x.status === "Chờ xác nhận hoàn thành" && <span className="status warning" title="Chờ người thân xác nhận">Chờ gia đình xác nhận</span>}
                      {!admin && !["Đã hủy", "Bị từ chối"].includes(x.status) && <button type="button" className="action warning-action" title="Báo cáo sự cố" aria-label={`Báo cáo sự cố cho lịch ${x.id}`} onClick={() => onIncident(x)}><AlertCircle size={16} /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="history-note">
          <Clock3 /> Người chăm sóc: Nhận lịch (Chờ xác nhận → Đã xác nhận) → Check-in (Đang chăm sóc) → Check-out (Chờ xác nhận hoàn thành). Người thân: Xác nhận hoàn thành (Hoàn thành) hoặc Chưa hoàn thành. Có thể hủy/từ chối theo nghiệp vụ.
        </div>
      </div>}
      {!admin && incidents.some(x => ownSchedules.some(sc => sc.id === x.scheduleId)) && <div className="card table-card" style={{ marginTop: 18 }}>
        <div className="section-head"><div><h2>Sự cố đã báo cáo</h2><p>Các báo cáo sự cố liên quan đến lịch chăm sóc của bạn.</p></div></div>
        <div className="table-scroll"><table><thead><tr><th>Mã báo cáo</th><th>Mã lịch</th><th>Loại sự cố</th><th>Ngày gửi</th><th>Trạng thái</th></tr></thead><tbody>
          {incidents.filter(x => ownSchedules.some(sc => sc.id === x.scheduleId)).map(x => <tr key={x.id}><td><b>{x.id}</b><small>{x.detail}</small></td><td>{x.scheduleId}</td><td>{x.reason}</td><td>{x.createdAt}</td><td><Status>{x.status}</Status></td></tr>)}
        </tbody></table></div>
      </div>}
    </>
  );
}
// ============================================================
// TIN NHẮN - FAMILY / CAREGIVER
// ============================================================
function MessagesPage({ messages, setMessages }) { const [text, setText] = useState(""); return <><PageHeader eyebrow="LIÊN LẠC" title="Tin nhắn" desc="Trao đổi thông tin giữa người thân/người cần chăm sóc và người chăm sóc." /><div className="chat card"><div className="chat-list"><div className="chat-contact active"><div className="avatar">NL</div><div><b>Nguyễn Thị Lan</b><small>Đang hoạt động</small></div></div><div className="chat-contact"><div className="avatar">MA</div><div><b>Trần Minh Anh</b><small>2 giờ trước</small></div></div></div><div className="chat-main"><div className="chat-head"><b>Nguyễn Thị Lan</b><span>Người chăm sóc</span></div><div className="messages">{messages.map((m, i) => <div className={"bubble-row " + (m.mine ? "mine" : "")} key={i}><div className="bubble">{m.text}<small>{m.time}</small></div></div>)}</div><div className="composer"><input value={text} onChange={e => setText(e.target.value)} placeholder="Nhập tin nhắn..." /><button onClick={() => { if (text.trim()) { setMessages([...messages, { from: "Bạn", text, time: "09:30", mine: true }]); setText("") } }}><Send size={18} /></button></div></div></div></> }
// ============================================================
// THÔNG BÁO NGƯỜI DÙNG - FAMILY / CAREGIVER
// ============================================================
function NotificationsPage({ data }) { const [items, setItems] = useState(data.map(n => ({ ...n, read: !!n.read })).concat([{ id: 999, title: "Đánh giá đã được gửi", content: "Cảm ơn bạn đã đánh giá dịch vụ.", target: "Bạn", status: "Đã gửi", read: false }])); return <><PageHeader eyebrow="THÔNG BÁO" title="Thông báo" desc="Xem thông báo về yêu cầu, lịch chăm sóc và hoạt động hệ thống." /><div className="card notifications"><div className="section-head"><div><h2>Thông báo của bạn</h2><p>{items.filter(x => !x.read).length} thông báo chưa đọc</p></div><button className="link-btn" onClick={() => setItems(items.map(x => ({ ...x, read: true })))}>Đánh dấu đã đọc tất cả</button></div>{items.map(n => <div className={"notification-row " + (!n.read ? "unread" : "")} key={n.id} onClick={() => setItems(items.map(x => x.id === n.id ? { ...x, read: true } : x))}><div className="notice-icon"><Bell size={19} /></div><div><b>{n.title}</b><p>{n.content}</p><small>{n.target} · {n.read ? "Đã đọc" : "Chưa đọc"}</small></div><MoreHorizontal /></div>)}</div></> }
function ProfilePage({ role, onSave }) { const [form, setForm] = useState({ name: role === "admin" ? "Quản trị viên" : role === "caregiver" ? "Nguyễn Thị Lan" : "Nguyễn Minh An", email: role === "admin" ? "admin@careconnect.vn" : role === "caregiver" ? "lan.care@gmail.com" : "minhan@gmail.com", phone: role === "admin" ? "0900 000 001" : role === "caregiver" ? "0901 234 567" : "0901 222 333", address: role === "admin" ? "TP. Huế" : "Vỹ Dạ, Huế", dob: "15/03/1998", gender: "Nữ" }); const [editing, setEditing] = useState(false); const update = (key, value) => setForm(prev => ({ ...prev, [key]: value })); const initials = form.name.split(" ").map(x => x[0]).slice(-2).join("").toUpperCase(); const save = () => { setEditing(false); onSave("Đã cập nhật thông tin cá nhân"); }; return <><PageHeader eyebrow="TÀI KHOẢN" title="Hồ sơ cá nhân" desc="Quản lý thông tin tài khoản và thông tin liên hệ của bạn." action={<Button onClick={() => setEditing(v => !v)} icon={Edit3}>{editing ? "Hủy chỉnh sửa" : "Chỉnh sửa hồ sơ"}</Button>} />    <div className="profile-grid">      <div className="card profile-card">        <div className="profile-cover"></div>        <div className="profile-body">          <div className="avatar huge photo-avatar"><img src={role === "caregiver" ? imageAssets.caregiver1 : imageAssets.profile} alt={form.name} /></div>          <h2>{form.name}</h2>          <p>{role === "admin" ? "Quản trị viên" : role === "caregiver" ? "Người chăm sóc" : "Người thân"}</p>          <div className="profile-actions"><Button kind="outline" icon={Mail}>{form.email}</Button><Button kind="outline" icon={Phone}>{form.phone}</Button></div>        </div>      </div>      <div className="card info-card">        <div className="section-head"><div><h2>Thông tin cá nhân</h2><p>Thông tin được sử dụng cho tài khoản và liên hệ.</p></div></div>        {editing ? <div className="form-grid">          <Field label="Họ và tên" value={form.name} onChange={e => update("name", e.target.value)} />          <Field label="Email" value={form.email} type="email" onChange={e => update("email", e.target.value)} />          <Field label="Số điện thoại" value={form.phone} onChange={e => update("phone", e.target.value)} />          <Field label="Ngày sinh" value={form.dob} onChange={e => update("dob", e.target.value)} />          <Field label="Giới tính" value={form.gender} onChange={e => update("gender", e.target.value)} />          <Field label="Địa chỉ" value={form.address} onChange={e => update("address", e.target.value)} />          <div className="full actions-row"><Button onClick={save} icon={Check}>Lưu thay đổi</Button><Button kind="outline" onClick={() => setEditing(false)} icon={X}>Hủy</Button></div>        </div> : <div className="info-list">          <Info label="Họ và tên" value={form.name} /><Info label="Email" value={form.email} /><Info label="Số điện thoại" value={form.phone} /><Info label="Ngày sinh" value={form.dob} /><Info label="Giới tính" value={form.gender} /><Info label="Địa chỉ" value={form.address} />        </div>}      </div>    </div>  </> } function SecurityPage({ onSave }) { return <><PageHeader eyebrow="BẢO MẬT" title="Đổi mật khẩu" desc="Thay đổi mật khẩu tài khoản để tăng cường bảo mật." /><div className="card form-card narrow"><Field label="Mật khẩu hiện tại" type="password" /><Field label="Mật khẩu mới" type="password" /><Field label="Xác nhận mật khẩu mới" type="password" /><Button onClick={() => onSave("Đã đổi mật khẩu")} icon={ShieldCheck}>Đổi mật khẩu</Button></div></> }
// ============================================================
// ADMIN - QUẢN LÝ TÀI KHOẢN
// ============================================================
function UsersPage({ data, query, setQuery, onAdd, onView, onEdit, onDelete, onToggle, onRole, notify }) {
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [roleFilter, setRoleFilter] = useState("Tất cả");
  const rows = data.filter(x => {
    const q = (x.name + " " + x.email + " " + x.role + " " + x.phone).toLowerCase().includes(query.toLowerCase());
    const st = statusFilter === "Tất cả" || x.status === statusFilter;
    const rl = roleFilter === "Tất cả" || x.role === roleFilter;
    return q && st && rl;
  });
  return <><PageHeader eyebrow="ADMIN • TÀI KHOẢN" title="Quản lý tài khoản" desc="Quản lý danh sách, xem chi tiết, chỉnh sửa, xóa, khóa/mở khóa và phân quyền tài khoản." action={<Button onClick={onAdd} icon={Plus}>Thêm tài khoản</Button>} />
    <div className="card table-card">
      <div className="table-head account-filters">
        <div className="search"><Search /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Tìm theo tên, email, số điện thoại..." /></div>
        <select className="filter-select" value={roleFilter} onChange={e => setRoleFilter(e.target.value)}><option>Tất cả</option><option>Người thân</option><option>Người cần chăm sóc</option><option>Người chăm sóc</option><option>Admin</option></select>
        <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}><option>Tất cả</option><option>Hoạt động</option><option>Đã duyệt</option><option>Chờ duyệt</option><option>Khóa</option></select>
      </div>
      <div className="table-scroll"><table><thead><tr><th>Tài khoản</th><th>Liên hệ</th><th>Vai trò</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>
        {rows.map(x => <tr key={x.id}>
          <td><div className="account-cell"><div className="avatar small-photo"><img src={x.role === "Người chăm sóc" ? caregiverImage(x.id) : imageAssets.profile} alt="" /></div><div><b>{x.name}</b><small>{x.email}</small></div></div></td>
          <td>{x.phone}</td>
          <td><span className="role-pill">{x.role}</span></td>
          <td><Status>{x.status}</Status></td>
          <td><div className="actions">
            <button className="action view" title="Xem chi tiết" onClick={() => onView(x)}><Eye size={16} /></button>
            <button className="action" title="Sửa tài khoản" onClick={() => onEdit(x)}><Edit3 size={16} /></button>
            <button className={"action " + (x.status === "Khóa" ? "success" : "warning-action")} title={x.status === "Khóa" ? "Mở tài khoản" : "Khóa tài khoản"} onClick={() => { if (window.confirm(x.status === "Khóa" ? `Mở khóa tài khoản ${x.name}?` : `Khóa tài khoản ${x.name}?`)) onToggle(x) }}>{x.status === "Khóa" ? <LockOpen size={16} /> : <Lock size={16} />}</button>
            <button className="action danger" title="Xóa tài khoản" onClick={() => { if (window.confirm(`Xóa tài khoản ${x.name}?`)) onDelete(x.id) }}><Trash2 size={16} /></button>
          </div></td>
        </tr>)}
        {!rows.length && <tr><td colSpan="5"><div className="empty-state"><Users size={30} /><b>Không tìm thấy tài khoản</b><span>Hãy thử thay đổi từ khóa hoặc bộ lọc.</span></div></td></tr>}
      </tbody></table></div>
      <div className="permission-box"><ShieldCheck /><div><b>Phân quyền tài khoản</b><span>Admin có thể thay đổi vai trò của từng tài khoản và kiểm soát trạng thái truy cập.</span></div></div>
    </div></>
}
// ============================================================
// ĐÁNH GIÁ - FAMILY / CAREGIVER
// ============================================================
function ReviewsPage({ role, data, schedules = [], onAdd }) {
  // Tự động lọc ra những người chăm sóc đã có lịch "Hoàn thành" để gợi ý đánh giá
  const completedCaregivers = Array.from(new Set(schedules.filter(x => x.status === "Hoàn thành").map(x => x.caregiver)));

  return (
    <>
      <PageHeader
        eyebrow="ĐÁNH GIÁ"
        title={role === "caregiver" ? "Đánh giá của bạn" : "Đánh giá người chăm sóc"}
        desc={role === "caregiver" ? "Xem các đánh giá từ gia đình về dịch vụ của bạn." : "Đánh giá người chăm sóc sau khi hoàn thành dịch vụ và xem lại lịch sử."}
      />

      {/* Khu vực nhắc nhở Đánh giá (Chỉ hiện cho Người thân nếu có ca đã hoàn thành) */}
      {!role.includes("caregiver") && completedCaregivers.length > 0 && (
        <div className="card" style={{ marginBottom: 30 }}>
          <div className="section-head" style={{ padding: "20px 20px 10px", borderBottom: "none" }}>
            <div>
              <h2>Chờ đánh giá</h2>
              <p>Những người chăm sóc đã hoàn thành dịch vụ cho gia đình bạn.</p>
            </div>
          </div>
          <div className="mini-list" style={{ padding: "0 20px 20px" }}>
            {completedCaregivers.map(name => (
              <div className="mini-row" key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                  <div className="avatar big">{name.split(" ").slice(-1)[0][0]}</div>
                  <div><b style={{ fontSize: 16 }}>{name}</b><br /><span style={{ color: '#666' }}>Vừa hoàn thành lịch chăm sóc</span></div>
                </div>
                <Button kind="outline" onClick={() => onAdd(name)} icon={Star}>Viết đánh giá</Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Khu vực Lịch sử các bài đã đánh giá */}
      <h3 style={{ margin: "0 0 15px 0", fontSize: 16, color: "#444" }}>Lịch sử đánh giá</h3>
      <div className="review-grid">
        {data.map(r => (
          <div className="card review-card" key={r.id}>
            <div className="review-head">
              <div className="avatar">{r.user.split(" ").slice(-1)[0][0]}</div>
              <div><b>{r.user}</b><small>{r.date} · Dịch vụ của: {r.caregiver}</small></div>
              <div className="stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
            </div>
            <p>{r.content}</p>
            <Status>{r.status}</Status>
          </div>
        ))}
      </div>
    </>
  );
}
// ============================================================
// ADMIN - QUẢN LÝ / KIỂM DUYỆT ĐÁNH GIÁ
// ============================================================
function AdminReviews({ data, onApprove, onDelete }) { return <><PageHeader eyebrow="ADMIN" title="Quản lý đánh giá" desc="Kiểm duyệt và xóa các đánh giá không phù hợp." /><div className="card table-card"><TableHead placeholder="Tìm đánh giá..." /><table><thead><tr><th>Người đánh giá</th><th>Người chăm sóc</th><th>Điểm</th><th>Nội dung</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>{data.map(r => <tr key={r.id}><td>{r.user}</td><td>{r.caregiver}</td><td>⭐ {r.rating}</td><td>{r.content}</td><td><Status>{r.status}</Status></td><td>{r.status === "Chờ duyệt" && <button className="action success" onClick={() => onApprove(r.id)}><Check /></button>}<button className="action danger" onClick={() => onDelete(r.id)}><Trash2 /></button></td></tr>)}</tbody></table></div></> }
// ============================================================
// ADMIN - QUẢN LÝ THÔNG BÁO
// ============================================================
function AdminNotifications({ data, onAdd, onEdit, onDelete }) { return <><PageHeader eyebrow="ADMIN" title="Quản lý thông báo" desc="Tạo, cập nhật và quản lý các thông báo trên hệ thống." action={<Button onClick={onAdd}>Tạo thông báo</Button>} /><div className="card table-card"><div className="table-scroll"><table><thead><tr><th>Tiêu đề</th><th>Nội dung</th><th>Đối tượng</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>{data.map(n => <tr key={n.id}><td><b>{n.title}</b></td><td>{n.content}</td><td>{n.target}</td><td><Status>{n.status}</Status></td><td><button className="action" title="Cập nhật" onClick={() => onEdit(n)}><Edit3 size={16} /></button><button className="action danger" title="Xóa" onClick={() => { if (window.confirm(`Xóa thông báo ${n.title}?`)) onDelete(n.id) }}><Trash2 size={16} /></button></td></tr>)}</tbody></table></div></div></> }
// ============================================================
// ADMIN - QUẢN LÝ NỘI DUNG WEBSITE
// ============================================================
function ContentPage({ data, onAdd, onView, onEdit, onDelete }) {
  return <><PageHeader eyebrow="ADMIN • NỘI DUNG" title="Quản lý bài viết" desc="Xem danh sách, thêm, sửa và xóa bài viết/tin tức trên website." action={<Button onClick={onAdd}>Thêm bài viết</Button>} /><div className="card table-card"><TableHead placeholder="Tìm tiêu đề bài viết..." /><div className="table-scroll"><table><thead><tr><th>Bài viết</th><th>Danh mục</th><th>Tác giả</th><th>Ngày</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>{data.map(p => <tr key={p.id}><td><b>{p.title}</b></td><td>{p.category}</td><td>{p.author}</td><td>{p.date}</td><td><Status>{p.status}</Status></td><td><button className="action" title="Xem" onClick={() => onView(p)}><Eye size={16} /></button><button className="action" title="Sửa" onClick={() => onEdit(p)}><Edit3 size={16} /></button><button className="action danger" title="Xóa" onClick={() => { if (window.confirm(`Xóa bài viết ${p.title}?`)) onDelete(p.id) }}><Trash2 size={16} /></button></td></tr>)}</tbody></table></div></div></>
}
// ============================================================
// ADMIN - THỐNG KÊ
// ============================================================
function AnalyticsPage({ users = [], elderly = [], caregivers = [], requests = [], schedules = [], reviews = [] }) { const [activeTab, setActiveTab] = useState("overview"); const demoStats = { totalUsers: 26, familyUsers: 15, caregiverUsers: 8, otherUsers: 3, activeUsers: 18, pendingUsers: 5, lockedUsers: 3, elderly: 2, totalRequests: 34, totalSchedules: 27, completedSchedules: 12, inProgressSchedules: 8, waitingSchedules: 5, cancelledSchedules: 2, totalReviews: 29, averageRating: "3.9", approvedReviews: 18, pendingReviews: 6, otherReviews: 5, rating5: 12, rating4: 8, rating3: 5, rating2: 3, rating1: 1 }; const countBy = (items, field, value) => items.filter(x => x?.[field] === value).length; const caregiverAccounts = users.filter(x => String(x.role || "").toLowerCase().includes("người chăm sóc")); const familyAccounts = users.filter(x => String(x.role || "").toLowerCase().includes("người thân") || String(x.role || "").toLowerCase().includes("người cần chăm sóc")); const activeUsers = users.filter(x => ["Hoạt động", "Đã duyệt"].includes(x.status)).length; const pendingUsers = countBy(users, "status", "Chờ duyệt"); const completedSchedules = countBy(schedules, "status", "Hoàn thành"); const inProgressSchedules = schedules.filter(x => ["Đang chăm sóc", "Đang thực hiện"].includes(x.status)).length; const waitingSchedules = schedules.filter(x => ["Chờ xác nhận", "Đã xác nhận", "Chờ xác nhận hoàn thành"].includes(x.status)).length; const cancelledSchedules = countBy(schedules, "status", "Đã hủy"); const averageRating = reviews.length ? (reviews.reduce((sum, x) => sum + (Number(x.rating) || 0), 0) / reviews.length).toFixed(1) : "0.0"; const approvedReviews = countBy(reviews, "status", "Đã duyệt"); const pendingReviews = countBy(reviews, "status", "Chờ duyệt"); const ratingCounts = [5, 4, 3, 2, 1].map(star => ({ label: `${star} sao`, value: reviews.filter(x => Number(x.rating) === star).length })); const tabs = [["overview", "Tổng quan", LayoutDashboard], ["users", "Người dùng", Users], ["care", "Hoạt động chăm sóc", HeartPulse], ["reviews", "Đánh giá", Star]]; const tabButtonStyle = active => ({ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 15px", borderRadius: 10, border: active ? "1px solid #b8ded2" : "1px solid #e8eeeb", background: active ? "#eaf6f1" : "#fff", color: active ? "#18785f" : "#64736d", fontWeight: 700, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }); const SectionTitle = ({ title, desc }) => <div style={{ marginBottom: 16 }}><h2 style={{ margin: 0, fontSize: 17, color: "#263f38" }}>{title}</h2>{desc && <p style={{ margin: "5px 0 0", color: "#87958f", fontSize: 12 }}>{desc}</p>}</div>; const BarList = ({ items, color = "#42a88a" }) => { const colors = ["#36A38A", "#4D91D8", "#E5A93D", "#D66B72", "#8B75C7", "#36A3B8"]; const max = Math.max(1, ...items.map(x => x.value)); return <div style={{ display: "grid", gap: 14 }}>{items.map((item, index) => <div key={item.label}><div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 6, fontSize: 13 }}><span style={{ color: "#53665e" }}>{item.label}</span><b style={{ color: "#29483d" }}>{item.value}</b></div><div style={{ height: 9, background: "#edf2ef", borderRadius: 20, overflow: "hidden" }}><div style={{ height: "100%", width: `${item.value / max * 100}%`, background: item.color || colors[index % colors.length] || color, borderRadius: 20, minWidth: item.value ? 4 : 0, transition: "width 0.4s ease" }} /></div></div>)}</div>; }; const EmptyState = ({ text }) => <div style={{ padding: 24, textAlign: "center", color: "#91a099", fontSize: 13 }}>{text}</div>; return <><PageHeader eyebrow="BÁO CÁO • ADMIN" title="Thống kê hệ thống" desc="Theo dõi tình hình người dùng, hoạt động chăm sóc và chất lượng dịch vụ trên CareConnect." /><div style={{ display: "flex", gap: 9, overflowX: "auto", paddingBottom: 14, marginBottom: 18 }}>{tabs.map(([id, label, Icon]) => <button key={id} onClick={() => setActiveTab(id)} style={tabButtonStyle(activeTab === id)}><Icon size={16} />{label}</button>)}</div>{activeTab === "overview" && <><div className="stats-grid"><Stat icon={Users} label="Tổng tài khoản" value={demoStats.totalUsers} sub={`${demoStats.activeUsers} tài khoản đang hoạt động`} /><Stat icon={UserCheck} label="Người chăm sóc" value={demoStats.caregiverUsers} sub={`${demoStats.pendingUsers} tài khoản chờ duyệt`} /><Stat icon={HeartPulse} label="Người cao tuổi" value={demoStats.elderly} sub="Hồ sơ đang được quản lý" /><Stat icon={ClipboardList} label="Lịch chăm sóc" value={demoStats.totalSchedules} sub={`${demoStats.completedSchedules} lịch đã hoàn thành`} /></div><div className="analytics-grid" style={{ marginTop: 18 }}><div className="card chart"><SectionTitle title="Tình hình hoạt động chăm sóc" desc="Thống kê theo trạng thái lịch chăm sóc hiện có" /><BarList items={[{ label: "Hoàn thành", value: 12 }, { label: "Đang chăm sóc", value: 8 }, { label: "Chờ xác nhận", value: 5 }, { label: "Đã hủy", value: 2 }]} /></div><div className="card chart"><SectionTitle title="Tổng hợp đánh giá" desc="Điểm đánh giá và tình trạng kiểm duyệt" /><div style={{ display: "flex", alignItems: "center", gap: 18, padding: "8px 0 18px" }}><div style={{ fontSize: 38, fontWeight: 800, color: "#d99b25" }}>★ {demoStats.averageRating}</div><div style={{ color: "#7e8d86", fontSize: 12 }}>{demoStats.totalReviews} lượt đánh giá<br />{demoStats.approvedReviews} đã duyệt · {demoStats.pendingReviews} chờ duyệt</div></div><BarList items={[{ label: "5 sao", value: demoStats.rating5 }, { label: "4 sao", value: demoStats.rating4 }, { label: "3 sao", value: demoStats.rating3 }, { label: "2 sao", value: demoStats.rating2 }, { label: "1 sao", value: demoStats.rating1 }]} color="#e6b34d" /></div></div></>}{activeTab === "users" && <><div className="stats-grid"><Stat icon={Users} label="Tổng tài khoản" value={demoStats.totalUsers} sub="Tất cả loại tài khoản" /><Stat icon={UserRound} label="Người thân" value={demoStats.familyUsers} sub="Tài khoản gia đình/người cần chăm sóc" /><Stat icon={UserCheck} label="Người chăm sóc" value={demoStats.caregiverUsers} sub="Tài khoản người chăm sóc" /><Stat icon={CheckCircle2} label="Đang hoạt động/đã duyệt" value={demoStats.activeUsers} sub={`${demoStats.pendingUsers} tài khoản chờ duyệt`} /></div><div className="analytics-grid" style={{ marginTop: 18 }}><div className="card chart"><SectionTitle title="Cơ cấu tài khoản" desc="Phân loại theo vai trò người dùng" /><BarList items={[{ label: "Người thân/người cần chăm sóc", value: demoStats.familyUsers }, { label: "Người chăm sóc", value: demoStats.caregiverUsers }, { label: "Vai trò khác", value: demoStats.otherUsers }]} /></div><div className="card chart"><SectionTitle title="Trạng thái tài khoản" desc="Số lượng tài khoản theo trạng thái hiện tại" /><BarList items={[{ label: "Hoạt động", value: demoStats.activeUsers }, { label: "Chờ duyệt", value: demoStats.pendingUsers }, { label: "Khóa", value: demoStats.lockedUsers }]} color="#6098d5" /></div></div><div className="card table-card" style={{ marginTop: 18 }}><SectionTitle title="Danh sách tài khoản" desc="Thông tin tài khoản đang được ghi nhận trong hệ thống" />{users.length ? <div className="table-scroll"><table><thead><tr><th>Họ và tên</th><th>Email</th><th>Vai trò</th><th>Trạng thái</th></tr></thead><tbody>{users.map(user => <tr key={user.id}><td><b>{user.name}</b></td><td>{user.email}</td><td>{user.role}</td><td><Status>{user.status}</Status></td></tr>)}</tbody></table></div> : <EmptyState text="Chưa có dữ liệu người dùng." />}</div></>}{activeTab === "care" && <><div className="stats-grid"><Stat icon={ClipboardList} label="Yêu cầu chăm sóc" value={demoStats.totalRequests} sub="Tổng yêu cầu đã tạo" /><Stat icon={CalendarDays} label="Tổng lịch chăm sóc" value={demoStats.totalSchedules} sub="Lịch đã được ghi nhận" /><Stat icon={CheckCircle2} label="Ca hoàn thành" value={demoStats.completedSchedules} sub="Lịch có trạng thái hoàn thành" /><Stat icon={Activity} label="Đang thực hiện" value={demoStats.inProgressSchedules} sub={`${demoStats.waitingSchedules} lịch đang chờ/xác nhận`} /></div><div className="analytics-grid" style={{ marginTop: 18 }}><div className="card chart"><SectionTitle title="Trạng thái lịch chăm sóc" desc="Theo dõi tiến độ thực hiện các ca chăm sóc" /><BarList items={[{ label: "Hoàn thành", value: demoStats.completedSchedules }, { label: "Đang chăm sóc", value: demoStats.inProgressSchedules }, { label: "Chờ xác nhận/đã xác nhận", value: demoStats.waitingSchedules }, { label: "Đã hủy", value: demoStats.cancelledSchedules }]} /></div><div className="card chart"><SectionTitle title="Trạng thái yêu cầu" desc="Số lượng yêu cầu theo trạng thái" /><BarList items={[{ label: "Chờ xác nhận", value: 10 }, { label: "Đã nhận", value: 12 }, { label: "Đang chăm sóc", value: 8 }, { label: "Hoàn thành", value: 3 }, { label: "Đã hủy", value: 1 }]} color="#6098d5" /></div></div><div className="card table-card" style={{ marginTop: 18 }}><SectionTitle title="Lịch chăm sóc gần đây" desc="Người cao tuổi, người chăm sóc và trạng thái từng lịch" />{schedules.length ? <div className="table-scroll"><table><thead><tr><th>Mã lịch</th><th>Ngày</th><th>Người cao tuổi</th><th>Người chăm sóc</th><th>Thời gian</th><th>Trạng thái</th></tr></thead><tbody>{schedules.map(x => <tr key={x.id}><td><b>{x.id}</b></td><td>{x.date}</td><td>{x.elderly}</td><td>{x.caregiver || "Chưa phân công"}</td><td>{x.time}</td><td><Status>{x.status}</Status></td></tr>)}</tbody></table></div> : <EmptyState text="Chưa có lịch chăm sóc." />}</div></>}{activeTab === "reviews" && <><div className="stats-grid"><Stat icon={Star} label="Tổng lượt đánh giá" value={demoStats.totalReviews} sub="Tất cả đánh giá đã gửi" /><Stat icon={Activity} label="Điểm trung bình" value={`${demoStats.averageRating}/5`} sub="Tính trên các đánh giá minh họa" /><Stat icon={CheckCircle2} label="Đã duyệt" value={demoStats.approvedReviews} sub="Đánh giá được hiển thị" /><Stat icon={Clock3} label="Chờ duyệt" value={demoStats.pendingReviews} sub="Cần Admin kiểm tra" /></div><div className="analytics-grid" style={{ marginTop: 18 }}><div className="card chart"><SectionTitle title="Phân bố số sao" desc="Số lượt đánh giá theo mức điểm từ 1 đến 5 sao" /><BarList items={[{ label: "5 sao", value: demoStats.rating5 }, { label: "4 sao", value: demoStats.rating4 }, { label: "3 sao", value: demoStats.rating3 }, { label: "2 sao", value: demoStats.rating2 }, { label: "1 sao", value: demoStats.rating1 }]} color="#e6b34d" /></div><div className="card chart"><SectionTitle title="Trạng thái kiểm duyệt" desc="Tình trạng xử lý đánh giá" /><BarList items={[{ label: "Đã duyệt", value: demoStats.approvedReviews }, { label: "Chờ duyệt", value: demoStats.pendingReviews }, { label: "Khác", value: demoStats.otherReviews }]} color="#6098d5" /></div></div><div className="card table-card" style={{ marginTop: 18 }}><SectionTitle title="Danh sách đánh giá" desc="Nội dung phản hồi và điểm đánh giá của người dùng" />{reviews.length ? <div className="table-scroll"><table><thead><tr><th>Người đánh giá</th><th>Người chăm sóc</th><th>Số sao</th><th>Nội dung</th><th>Ngày</th><th>Trạng thái</th></tr></thead><tbody>{reviews.map(x => <tr key={x.id}><td><b>{x.user}</b></td><td>{x.caregiver}</td><td><span style={{ color: "#e0a52f", fontWeight: 700 }}>{"★".repeat(Math.max(0, Math.min(5, Number(x.rating) || 0)))}{"☆".repeat(5 - Math.max(0, Math.min(5, Number(x.rating) || 0)))}</span></td><td>{x.content}</td><td>{x.date}</td><td><Status>{x.status}</Status></td></tr>)}</tbody></table></div> : <EmptyState text="Chưa có đánh giá nào." />}</div></>}</>; }
function FakeChart({ values }) { const max = Math.max(...values); return <div className="bars">{values.map((v, i) => <div className="bar-col" key={i}><div className="bar" style={{ height: `${v / max * 170}px` }} /><small>{i + 1}</small></div>)}</div> }

function TableHead({ placeholder, value = "", onChange = () => { } }) { return <div className="table-head"><div className="search"><Search /><input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} /></div><button className="filter-btn"><Filter /> Lọc</button></div> }
function ActionButtons({ onView, onEdit, onDelete }) { return <span className="actions">{onView && <button className="action" onClick={onView}><Eye size={16} /></button>}{onEdit && <button className="action" onClick={onEdit}><Edit3 size={16} /></button>}{onDelete && <button className="action danger" onClick={onDelete}><Trash2 size={16} /></button>}</span> }
function Info({ label, value }) { return <div className="info-row"><span>{label}</span><b>{value}</b></div> }
function Field({ label, value = "", type = "text", onChange }) { return <label className="field"><span>{label}</span><input type={type} defaultValue={value} onChange={onChange} /></label> }
function SelectField({ label, value, onChange, options = [] }) { return <label className="field"><span>{label}</span><select value={value} onChange={onChange}>{options.map(o => <option key={o}>{o}</option>)}</select></label> }

// ============================================================
// NGƯỜI LIÊN HỆ KHẨN CẤP
// ============================================================
function EmergencyContactsPage({ data, onAdd, onEdit, onDelete }) { return <><PageHeader eyebrow="AN TOÀN" title="Người liên hệ khẩn cấp" desc="Quản lý người liên hệ để hỗ trợ xử lý tình huống khẩn cấp của người cao tuổi." action={<Button onClick={onAdd}>Thêm liên hệ</Button>} /><div className="card table-card"><TableHead placeholder="Tìm người cao tuổi, người liên hệ..." /><table><thead><tr><th>Người cao tuổi</th><th>Người liên hệ</th><th>Quan hệ</th><th>Số điện thoại</th><th>Ưu tiên</th><th>Thao tác</th></tr></thead><tbody>{data.map(x => <tr key={x.id}><td><b>{x.elderly}</b></td><td>{x.name}</td><td>{x.relation}</td><td>{x.phone}</td><td><Status>{x.priority}</Status></td><td><ActionButtons onView={() => onEdit(x)} onEdit={() => onEdit(x)} onDelete={() => onDelete(x.id)} /></td></tr>)}</tbody></table></div></> }

// ============================================================
// ADMIN - KIỂM DUYỆT BÁO CÁO YÊU CẦU
// ============================================================
function ReportsAdmin({ data, onApprove, onReject, onDelete }) { return <><PageHeader eyebrow="ADMIN • KIỂM DUYỆT" title="Báo cáo vi phạm" desc="Tiếp nhận, xem xét và xử lý các báo cáo liên quan đến yêu cầu chăm sóc." /><div className="permission-box"><ShieldCheck size={20} /><div><b>Quy trình xử lý</b><span>Người chăm sóc báo cáo → Admin xem xét → Đã xử lý → yêu cầu hợp lệ hoặc yêu cầu không hợp lệ → tiếp tục quy trình yêu cầu.</span></div></div><div className="card table-card"><TableHead placeholder="Tìm mã báo cáo, mã yêu cầu, người báo cáo..." /><div className="table-scroll"><table><thead><tr><th>Mã báo cáo</th><th>Yêu cầu</th><th>Người báo cáo</th><th>Lý do</th><th>Ngày</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>{data.map(x => <tr key={x.id}><td><b>{x.id}</b></td><td>{x.requestId}</td><td>{x.reporter}</td><td>{x.reason}<small>{x.detail}</small></td><td>{x.date}</td><td><Status>{x.status}</Status></td><td><div className="actions">{x.status === "Chờ kiểm duyệt" && <><button className="action success" title="Xử lý báo cáo" onClick={() => onApprove(x.id)}><Check size={16} /></button><button className="action warning-action" title="Yêu cầu không hợp lệ" onClick={() => onReject(x.id)}><X size={16} /></button></>}<button className="action danger" title="Xóa" onClick={() => onDelete(x.id)}><Trash2 size={16} /></button></div></td></tr>)}</tbody></table></div></div></> }

// ============================================================
// ADMIN - HÌNH ẢNH & THÔNG TIN WEBSITE
// ============================================================
function MediaWebsitePage({ media, websiteInfo, onMediaAdd, onMediaEdit, onMediaDelete, onWebsiteEdit }) { return <><PageHeader eyebrow="ADMIN • NỘI DUNG" title="Hình ảnh & thông tin website" desc="Quản lý hình ảnh dùng trên website và thông tin giới thiệu của CareConnect." /><div className="dashboard-grid" style={{ marginBottom: 18 }}><div className="card table-card"><div className="section-head"><div><h2>Quản lý hình ảnh</h2><p>Thêm, xem, sửa và xóa hình ảnh.</p></div><Button onClick={onMediaAdd}>Thêm hình ảnh</Button></div><div className="table-scroll"><table><thead><tr><th>Hình ảnh</th><th>Loại</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>{media.map(x => <tr key={x.id}><td><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><img src={x.url} alt={x.name} style={{ width: 58, height: 42, objectFit: 'cover', borderRadius: 8 }} /><b>{x.name}</b></div></td><td>{x.type}</td><td><Status>{x.status}</Status></td><td><ActionButtons onView={() => onMediaEdit(x)} onEdit={() => onMediaEdit(x)} onDelete={() => onMediaDelete(x.id)} /></td></tr>)}</tbody></table></div></div><div className="card info-card"><div className="section-head"><div><h2>Thông tin website</h2><p>Nội dung hiển thị ở phần giới thiệu/liên hệ.</p></div><Button kind="outline" icon={Edit3} onClick={onWebsiteEdit}>Cập nhật</Button></div><div className="info-list"><Info label="Tên website" value={websiteInfo.siteName} /><Info label="Slogan" value={websiteInfo.slogan} /><Info label="Điện thoại" value={websiteInfo.phone} /><Info label="Email" value={websiteInfo.email} /><Info label="Địa chỉ" value={websiteInfo.address} /><Info label="Giới thiệu" value={websiteInfo.introduction} /></div></div></div></> }

// ============================================================
// MODAL / FORM DÙNG CHUNG
// ============================================================
function Modal({ title, onClose, children }) { return <div className="modal-backdrop"><div className="modal"><div className="modal-head"><div><span className="eyebrow">FORM</span><h2>{title}</h2></div><button className="icon-btn" onClick={onClose}><X /></button></div>{children}</div></div> }

function ModalContent({ type, data, reviews, onSave, onClose, notify }) {
  const [form, setForm] = useState(data || {});
  const update = (k, v) => setForm({ ...form, [k]: v });

  if (type === "care-admin-detail") return <div className="account-detail"><div className="detail-hero"><div className="avatar detail-avatar"><img src={caregiverImage(data?.id)} alt={data?.name} /></div><div><span className="eyebrow">HỒ SƠ CHĂM SÓC MÃ #{data?.id}</span><h2>{data?.name}</h2><div className="detail-sub">{data?.area}</div></div><Status>{data?.status}</Status></div><div className="detail-grid"><Info label="Kinh nghiệm" value={data?.exp} /><Info label="Thời gian làm việc" value={data?.time} /><Info label="Khu vực hoạt động" value={data?.area} /><Info label="Điểm đánh giá" value={`⭐ ${data?.rating} (${data?.reviews} lượt)`} /><Info label="Kỹ năng chuyên môn" value={data?.skills} /><Info label="Chứng chỉ" value={data?.certificate || "Chưa cập nhật"} /><Info label="Mức giá" value={data?.price || "Chưa cập nhật"} /><Info label="Phạm vi công việc" value={data?.scope || "Chưa cập nhật"} /><Info label="Lịch rảnh" value={data?.availability || "Chưa cập nhật"} /><Info label="Số điện thoại" value={data?.phone || "Chưa cập nhật"} /><Info label="Email liên hệ" value={data?.email || "Chưa cập nhật"} /><Info label="Ca đã hoàn thành" value={data?.completedJobs || "Chưa cập nhật"} /></div><div className="modal-actions"><Button kind="outline" icon={X} onClick={onClose}>Đóng</Button></div></div>;

  if (type === "schedule-detail") return <div className="account-detail"><div className="detail-hero"><div className="avatar detail-avatar"><CalendarDays size={40} color="#007bff" /></div><div><span className="eyebrow">LỊCH CHĂM SÓC #{data?.id}</span><h2>{data?.date}</h2><div className="detail-sub">{data?.time}</div></div><Status>{data?.status}</Status></div><div className="detail-grid"><Info label="Người cao tuổi" value={data?.elderly} /><Info label="Người chăm sóc" value={data?.caregiver || "Chưa phân công"} /><Info label="Ngày thực hiện" value={data?.date} /><Info label="Giờ thực hiện" value={data?.time} /><Info label="Check-in" value={data?.checkIn || "Chưa check-in"} /><Info label="Check-out" value={data?.checkOut || "Chưa check-out"} /></div>{data?.status === "Hoàn thành" && <div style={{ marginTop: 20, padding: 15, background: '#e8f5e9', borderRadius: 8, border: "1px solid #c8e6c9" }}><p style={{ margin: 0, fontSize: 14, color: '#2e7d32' }}><b>✓ Ca chăm sóc đã hoàn thành</b></p><p style={{ margin: '5px 0 0 0', fontSize: 13, color: '#1b5e20' }}>Người chăm sóc đã xác nhận hoàn tất công việc đúng thời gian quy định. Gia đình có thể xem đánh giá chất lượng trong mục Đánh giá.</p></div>}<div className="modal-actions" style={{ marginTop: 20 }}><Button kind="outline" icon={X} onClick={onClose}>Đóng</Button></div></div>;

  if (type === "care-view") {
    const caregiverReviews = reviews?.filter(r => r.caregiver === data?.name && r.status === "Đã duyệt") || [];
    return <div className="modal-view"><div className="avatar huge photo-avatar"><img src={caregiverImage(data?.id)} alt={data?.name} /></div><h2>{data?.name}</h2><p>{data?.area} · {data?.exp}</p><div className="rating">⭐ {data?.rating} ({data?.reviews} đánh giá)</div><Info label="Kỹ năng" value={data?.skills} /><Info label="Chứng chỉ" value={data?.certificate || "Chưa cập nhật"} /><Info label="Mức giá" value={data?.price || "Chưa cập nhật"} /><Info label="Phạm vi công việc" value={data?.scope || "Chưa cập nhật"} /><Info label="Lịch rảnh" value={data?.availability || "Chưa cập nhật"} /><Info label="Thời gian" value={data?.time} /><div style={{ textAlign: 'left', marginTop: 20, borderTop: '1px solid #eee', paddingTop: 15 }}><h3 style={{ fontSize: 15, marginBottom: 10, color: '#333' }}>Đánh giá từ khách hàng</h3><div style={{ maxHeight: 200, overflowY: 'auto', paddingRight: 5 }}>{caregiverReviews.length > 0 ? caregiverReviews.map(r => <div key={r.id} style={{ background: '#f8f9fa', padding: 12, borderRadius: 8, marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}><b style={{ fontSize: 14 }}>{r.user}</b><span style={{ color: '#f59e0b', fontSize: 14 }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span></div><p style={{ margin: 0, fontSize: 13, color: '#444' }}>{r.content}</p><small style={{ color: '#888', fontSize: 11, display: 'block', marginTop: 5 }}>{r.date}</small></div>) : <p style={{ fontSize: 13, color: '#888', fontStyle: 'italic', margin: 0 }}>Chưa có đánh giá nào.</p>}</div></div><div className="modal-actions" style={{ marginTop: 15 }}><Button onClick={() => { notify(`Đã chọn ${data?.name} làm người chăm sóc`); onClose() }} icon={Check}>Chọn người chăm sóc</Button></div></div>;
  }

  if (type === "elderly-detail") return <div className="account-detail"><div className="detail-hero"><div className="avatar detail-avatar"><HeartPulse size={40} color="#ff4b4b" /></div><div><span className="eyebrow">HỒ SƠ MÃ #{data?.id}</span><h2>{data?.name}</h2><div className="detail-sub">{data?.address}</div></div><Status>{data?.health}</Status></div><div className="detail-grid"><Info label="Tuổi" value={data?.age} /><Info label="Giới tính" value={data?.gender} /><Info label="Sức khỏe" value={data?.health} /><Info label="Số điện thoại" value={data?.phone} /><Info label="Người thân quản lý" value={data?.guardian || "Chưa cập nhật"} /><Info label="Mối quan hệ" value={data?.relation} /><Info label="Hồ sơ đính kèm" value={data?.attachment || "Chưa có"} /></div><div className="modal-actions"><Button kind="outline" icon={X} onClick={onClose}>Đóng</Button></div></div>;

  if (type === "request-applicants") {
    const dummyApplicants = [{ name: "Trần Minh Anh", exp: "4 năm", rating: 4.8, reviews: 64, img: imageAssets.caregiver2 }, { name: "Lê Thị Hương", exp: "8 năm", rating: 5.0, reviews: 112, img: imageAssets.caregiver3 }, { name: "Nguyễn Thị Lan", exp: "5 năm", rating: 4.9, reviews: 86, img: imageAssets.caregiver1 }];
    const applicants = dummyApplicants.slice(0, data?.registered || 1);
    return <div className="applicants-modal"><p style={{ marginBottom: 15, color: "#666" }}>Yêu cầu <b>{data?.id}</b> hiện có {data?.registered} người chăm sóc muốn nhận ca:</p><div className="care-grid" style={{ gridTemplateColumns: "1fr", maxHeight: "400px", overflowY: "auto", paddingRight: "5px" }}>{applicants.map((app, idx) => <div key={idx} className="care-card" style={{ display: 'flex', alignItems: 'center', gap: 15, padding: 15, textAlign: 'left', flexDirection: 'row' }}><div className="avatar big photo-avatar" style={{ margin: 0 }}><img src={app.img} alt={app.name} /></div><div style={{ flex: 1 }}><h3 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>{app.name}</h3><div className="rating">⭐ {app.rating} ({app.reviews} đánh giá) · {app.exp} kinh nghiệm</div></div><div style={{ display: 'flex', gap: 10, flexDirection: 'column' }}><Button kind="outline" onClick={() => notify(`Đang mở hồ sơ chi tiết của ${app.name}`)}>Xem hồ sơ</Button><Button icon={Check} onClick={() => { onAccept(data.id); notify(`Đã chọn ${app.name} làm người chăm sóc!`); onClose(); }}>Chọn</Button></div></div>)}</div><div className="modal-actions" style={{ marginTop: 20 }}><Button kind="outline" icon={X} onClick={onClose}>Đóng</Button></div></div>;
  }

  if (type === "incident") return <div><div className="modal-form"><p style={{ marginTop: 0, color: "#64736e" }}>Lịch <b>{data?.id}</b> · {data?.elderly} · {data?.date} ({data?.time})</p><label className="field"><span>Loại sự cố *</span><select value={form.reason || ""} onChange={e => update("reason", e.target.value)}><option value="">Chọn loại sự cố</option>{["Sức khỏe người cao tuổi", "Tai nạn / chấn thương", "Không thể thực hiện chăm sóc", "Sự cố về thời gian", "Sự cố an toàn", "Khác"].map(x => <option key={x} value={x}>{x}</option>)}</select></label><label className="field"><span>Mô tả sự cố *</span><textarea value={form.detail || ""} onChange={e => update("detail", e.target.value)} placeholder="Mô tả thời điểm, tình huống và hướng xử lý..." rows={5}/></label></div><div className="modal-actions"><Button kind="outline" icon={X} onClick={onClose}>Đóng</Button><Button icon={Send} onClick={() => { if (!form.reason || !form.detail?.trim()) { notify("Vui lòng chọn loại sự cố và nhập mô tả"); return; } onSave(form); }}>Gửi báo cáo</Button></div></div>;

  if (type === "report") return <Form onSave={() => onSave(form)} onClose={onClose}><SelectField label="Mã yêu cầu" value={form.requestId || data?.id || ""} onChange={e => update("requestId", e.target.value)} options={data?.id ? [data.id] : []} /><Field label="Lý do báo cáo" value={form.reason || ""} onChange={e => update("reason", e.target.value)} /><Field label="Nội dung chi tiết" value={form.detail || ""} onChange={e => update("detail", e.target.value)} /></Form>;

  if (type === "emergency") return <Form onSave={() => onSave(form)} onClose={onClose}><SelectField label="Người cao tuổi" value={form.elderly || ""} onChange={e => update("elderly", e.target.value)} options={["Nguyễn Văn Bình", "Trần Thị Hoa", "Lê Văn Nam"]} /><Field label="Người liên hệ" value={form.name || ""} onChange={e => update("name", e.target.value)} /><SelectField label="Mối quan hệ" value={form.relation || "Con"} onChange={e => update("relation", e.target.value)} options={["Con", "Vợ/Chồng", "Anh/Chị/Em", "Người thân", "Khác"]} /><Field label="Số điện thoại" value={form.phone || ""} onChange={e => update("phone", e.target.value)} /><SelectField label="Mức ưu tiên" value={form.priority || "Chính"} onChange={e => update("priority", e.target.value)} options={["Chính", "Dự phòng"]} /></Form>;

  if (type === "media") return <Form onSave={() => onSave(form)} onClose={onClose}><Field label="Tên hình ảnh" value={form.name || ""} onChange={e => update("name", e.target.value)} /><SelectField label="Loại hình ảnh" value={form.type || "Banner"} onChange={e => update("type", e.target.value)} options={["Banner", "Logo", "Bài viết", "Khác"]} /><Field label="Đường dẫn hình ảnh" value={form.url || ""} onChange={e => update("url", e.target.value)} /></Form>;

  if (type === "website-info") return <Form onSave={() => onSave(form)} onClose={onClose}><Field label="Tên website" value={form.siteName || ""} onChange={e => update("siteName", e.target.value)} /><Field label="Slogan" value={form.slogan || ""} onChange={e => update("slogan", e.target.value)} /><Field label="Số điện thoại" value={form.phone || ""} onChange={e => update("phone", e.target.value)} /><Field label="Email" value={form.email || ""} onChange={e => update("email", e.target.value)} /><Field label="Địa chỉ" value={form.address || ""} onChange={e => update("address", e.target.value)} /><Field label="Giới thiệu" value={form.introduction || ""} onChange={e => update("introduction", e.target.value)} /></Form>;

  if (type === "elderly") return <Form onSave={() => onSave(form)} onClose={onClose}><Field label="Họ và tên" value={form.name || ""} onChange={e => update("name", e.target.value)} /><Field label="Ngày sinh" value={form.birthDate || ""} type="date" onChange={e => update("birthDate", e.target.value)} /><SelectField label="Giới tính" value={form.gender || "Nam"} onChange={e => update("gender", e.target.value)} options={["Nam", "Nữ", "Khác"]} /><Field label="Địa chỉ" value={form.address || ""} onChange={e => update("address", e.target.value)} /><Field label="Nhu cầu chăm sóc" value={form.careNeed || ""} onChange={e => update("careNeed", e.target.value)} /><Field label="Thông tin sức khỏe cơ bản" value={form.healthInfo || ""} onChange={e => update("healthInfo", e.target.value)} /><label className="field"><span>Hồ sơ đính kèm</span><input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={e => update("attachment", e.target.files?.[0]?.name || "")} /></label><Field label="Ghi chú" value={form.note || ""} onChange={e => update("note", e.target.value)} /></Form>;

  if (type === "care-profile") return <Form onSave={() => onSave(form)} onClose={onClose}><Field label="Họ tên" value={form.name || ""} onChange={e => update("name", e.target.value)} /><Field label="Kinh nghiệm" value={form.exp || ""} onChange={e => update("exp", e.target.value)} /><Field label="Khu vực" value={form.area || ""} onChange={e => update("area", e.target.value)} /><Field label="Kỹ năng" value={form.skills || ""} onChange={e => update("skills", e.target.value)} /><Field label="Thời gian làm việc" value={form.time || ""} onChange={e => update("time", e.target.value)} /><Field label="Chứng chỉ" value={form.certificate || ""} onChange={e => update("certificate", e.target.value)} /><Field label="Mức giá" value={form.price || ""} onChange={e => update("price", e.target.value)} /><Field label="Phạm vi công việc" value={form.scope || ""} onChange={e => update("scope", e.target.value)} /><Field label="Lịch rảnh" value={form.availability || ""} onChange={e => update("availability", e.target.value)} /><Field label="Hồ sơ đính kèm" value={form.attachment || ""} onChange={e => update("attachment", e.target.value)} /></Form>;

  if (type === "request") return <Form onSave={() => onSave(form)} onClose={onClose}><SelectField label="Người cao tuổi" value={form.elderly || ""} onChange={e => update("elderly", e.target.value)} options={["Nguyễn Văn Bình", "Trần Thị Hoa", "Lê Văn Nam"]} /><Field label="Tiêu đề yêu cầu" value={form.title || ""} onChange={e => update("title", e.target.value)} /><Field label="Mô tả nhu cầu chăm sóc" value={form.description || ""} onChange={e => update("description", e.target.value)} /><Field label="Địa điểm chăm sóc" value={form.location || ""} onChange={e => update("location", e.target.value)} /><Field label="Thời gian bắt đầu" value={form.startTime || ""} type="datetime-local" onChange={e => update("startTime", e.target.value)} /><Field label="Thời gian kết thúc" value={form.endTime || ""} type="datetime-local" onChange={e => update("endTime", e.target.value)} /><Field label="Yêu cầu kỹ năng" value={form.requiredSkills || ""} onChange={e => update("requiredSkills", e.target.value)} /><Field label="Mức giá dự kiến" value={form.expectedPrice || ""} type="number" onChange={e => update("expectedPrice", e.target.value)} /></Form>;

  if (type === "schedule") return <Form onSave={() => onSave(form)} onClose={onClose}><SelectField label="Mã yêu cầu chăm sóc" value={form.requestId || ""} onChange={e => update("requestId", e.target.value)} options={["YC001", "YC002", "YC003"]} /><SelectField label="Người chăm sóc" value={form.caregiver || ""} onChange={e => update("caregiver", e.target.value)} options={["Nguyễn Thị Lan", "Trần Minh Anh", "Lê Thị Hương"]} /><Field label="Ngày bắt đầu" value={form.startDate || ""} type="date" onChange={e => update("startDate", e.target.value)} /><Field label="Ngày kết thúc" value={form.endDate || ""} type="date" onChange={e => update("endDate", e.target.value)} /><Field label="Giờ bắt đầu" value={form.startTime || ""} type="time" onChange={e => update("startTime", e.target.value)} /><Field label="Giờ kết thúc" value={form.endTime || ""} type="time" onChange={e => update("endTime", e.target.value)} /></Form>;

  if (type === "user-detail") return <div className="account-detail"><div className="detail-hero"><div className="avatar detail-avatar"><img src={data?.role === "Người chăm sóc" ? caregiverImage(data?.id) : imageAssets.profile} alt="" /></div><div><span className="eyebrow">TÀI KHOẢN #{data?.id}</span><h2>{data?.name}</h2><div className="detail-sub">{data?.email}</div></div><Status>{data?.status}</Status></div><div className="detail-grid"><Info label="Họ và tên" value={data?.name} /><Info label="Email" value={data?.email} /><Info label="Số điện thoại" value={data?.phone} /><Info label="Vai trò" value={data?.role} /><Info label="Trạng thái" value={data?.status} /><Info label="Ngày tạo" value={data?.createdAt || "01/10/2026"} /></div><div className="modal-actions detail-actions"><Button kind="outline" icon={X} onClick={onClose}>Đóng</Button><Button icon={Edit3} onClick={() => { onClose(); notify("Chọn Sửa để cập nhật tài khoản") }}>Sửa tài khoản</Button></div></div>;

  if (type === "user") return <Form onSave={() => onSave(form)} onClose={onClose}><Field label="Họ tên" value={form.name || ""} onChange={e => update("name", e.target.value)} /><Field label="Email" value={form.email || ""} type="email" onChange={e => update("email", e.target.value)} /><Field label="Số điện thoại" value={form.phone || ""} onChange={e => update("phone", e.target.value)} /><SelectField label="Vai trò" value={form.role || "Người thân"} onChange={e => update("role", e.target.value)} options={["Người thân", "Người cần chăm sóc", "Người chăm sóc", "Admin"]} /><SelectField label="Trạng thái" value={form.status || "Hoạt động"} onChange={e => update("status", e.target.value)} options={["Hoạt động", "Đã duyệt", "Chờ duyệt", "Khóa"]} /></Form>;

  if (type === "request-detail") return <div className="modal-view request-detail"><div className="request-icon"><ClipboardList /></div><h2>{data?.id}</h2><p className="detail-sub">{data?.elderly} • {data?.type}</p><div className="detail-grid"><Info label="Địa điểm" value={data?.location} /><Info label="Ngày" value={data?.date} /><Info label="Thời gian" value={data?.time} /><Info label="Người đăng ký" value={`${data?.registered || 0} người`} /><Info label="Trạng thái" value={data?.status} /><Info label="Kiểm duyệt" value={data?.moderation || "Chưa có báo cáo"} /></div><div className="modal-actions"><Button kind="outline" icon={X} onClick={onClose}>Đóng</Button></div></div>;

  if (type === "post-detail") return <div className="modal-view post-detail"><div className="post-cover"><BookOpen /></div><span className="eyebrow">{data?.category}</span><h2>{data?.title}</h2><p className="detail-sub">{data?.author} • {data?.date}</p><div className="post-body">Nội dung bài viết được hiển thị tại đây để Admin xem trước trước khi chỉnh sửa hoặc đăng tải.</div><div className="modal-actions"><Button kind="outline" icon={X} onClick={onClose}>Đóng</Button></div></div>;

  if (type === "post") return <Form onSave={() => onSave(form)} onClose={onClose}><Field label="Tiêu đề" value={form.title || ""} onChange={e => update("title", e.target.value)} /><SelectField label="Danh mục" value={form.category || "Kiến thức chăm sóc"} onChange={e => update("category", e.target.value)} options={["Kiến thức chăm sóc", "Sức khỏe người cao tuổi", "Kinh nghiệm chăm sóc", "Tin tức"]} /><Field label="Nội dung" value={form.content || ""} onChange={e => update("content", e.target.value)} /></Form>;

  if (type === "notice") return <Form onSave={() => onSave(form)} onClose={onClose}><Field label="Tiêu đề" value={form.title || ""} onChange={e => update("title", e.target.value)} /><Field label="Nội dung" value={form.content || ""} onChange={e => update("content", e.target.value)} /><SelectField label="Đối tượng nhận" value={form.target || "Tất cả"} onChange={e => update("target", e.target.value)} options={["Tất cả", "Người cần chăm sóc/Người thân", "Người chăm sóc"]} /></Form>;

  if (type === "review") return <Form onSave={() => onSave(form)} onClose={onClose}><SelectField label="Người chăm sóc" value={form.caregiver || ""} onChange={e => update("caregiver", e.target.value)} options={["Nguyễn Thị Lan", "Trần Minh Anh", "Lê Thị Hương"]} /><Field label="Điểm đánh giá (1-5)" value={form.rating || 5} type="number" onChange={e => update("rating", e.target.value)} /><Field label="Nội dung đánh giá" value={form.content || ""} onChange={e => update("content", e.target.value)} /></Form>;

  return null;
}

function Form({ children, onSave, onClose }) { return <><div className="form-grid modal-form">{children}</div><div className="modal-actions"><Button kind="outline" icon={X} onClick={onClose || (() => { })}>Hủy</Button><Button onClick={onSave} icon={Check}>Lưu</Button></div></> }

// ============================================================
// XÁC THỰC TÀI KHOẢN
// ============================================================
function AuthScreen({ mode, setMode, onLogin }) { return <div className="auth"><div className="auth-card"><div className="brand center"><div className="brand-mark"><HeartPulse /></div><div><b><span>CareConnect</span></b><small>Chăm sóc tận tâm</small></div></div>{mode === "login" ? <><h1>Chào mừng trở lại</h1><p>Đăng nhập để quản lý dịch vụ chăm sóc.</p><Field label="Email" value="demo@careconnect.vn" /><Field label="Mật khẩu" value="123456" type="password" /><Button onClick={onLogin} icon={LogIn}>Đăng nhập</Button><button className="auth-link" onClick={() => setMode("register")}>Chưa có tài khoản? Đăng ký</button><button className="auth-link" onClick={() => setMode("forgot")}>Quên mật khẩu?</button></> : mode === "register" ? <><h1>Tạo tài khoản</h1><p>Đăng ký tài khoản để sử dụng hệ thống.</p><Field label="Họ và tên" /><Field label="Email" /><Field label="Số điện thoại" /><SelectField label="Loại tài khoản" value="Người chăm sóc" onChange={() => { }} options={["Người thân", "Người cần chăm sóc", "Người chăm sóc"]} /><Field label="Mật khẩu" type="password" /><Button onClick={() => setMode("login")} icon={Check}>Đăng ký</Button><button className="auth-link" onClick={() => setMode("login")}>Đã có tài khoản? Đăng nhập</button></> : <><h1>Khôi phục mật khẩu</h1><p>Nhập email để nhận hướng dẫn.</p><Field label="Email" /><Button onClick={() => setMode("login")} icon={Send}>Gửi yêu cầu</Button><button className="auth-link" onClick={() => setMode("login")}>Quay lại đăng nhập</button></>}</div></div> }

export default App;