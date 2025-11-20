'use client';

import { trpc } from '@/lib/trpc/client';

export default function DashboardPage() {
  // گرفتن آمار کاربران
  const stats = trpc.getUserStats.useQuery();

  // گرفتن کاربران اخیر
  const users = trpc.getUsers.useQuery();

  return (
    <div style={{ padding: '20px', fontFamily: 'Tahoma' }}>
      <h1 style={{ color: '#333', marginBottom: '30px' }}>🎯 داشبورد مدیریت</h1>

      {/* کارت‌های آمار */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        {/* کارت کل کاربران */}
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>کل کاربران</h3>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>
            {stats.isLoading ? '...' : stats.data?.data?.total || 0}
          </p>
        </div>

        {/* کارت دانشجویان */}
        <div
          style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>دانشجویان</h3>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>
            {stats.isLoading ? '...' : stats.data?.data?.byRole?.student || 0}
          </p>
        </div>

        {/* کارت اساتید */}
        <div
          style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>اساتید</h3>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>
            {stats.isLoading ? '...' : stats.data?.data?.byRole?.teacher || 0}
          </p>
        </div>

        {/* کارت مدیران */}
        <div
          style={{
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            color: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>مدیران</h3>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>
            {stats.isLoading ? '...' : stats.data?.data?.byRole?.admin || 0}
          </p>
        </div>
      </div>

      {/* کاربران اخیر */}
      <div
        style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ marginBottom: '20px', color: '#333' }}>👥 کاربران اخیر</h2>

        {users.isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>⏳ در حال بارگذاری کاربران...</p>
          </div>
        ) : users.error ? (
          <div
            style={{
              textAlign: 'center',
              padding: '40px',
              color: '#e74c3c',
            }}
          >
            <p>❌ خطا در دریافت کاربران</p>
            <button
              onClick={() => users.refetch()}
              style={{
                background: '#3498db',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              تلاش مجدد
            </button>
          </div>
        ) : !users.data?.data?.length ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>📝 هیچ کاربری وجود ندارد</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gap: '12px',
              maxHeight: '400px',
              overflowY: 'auto',
            }}
          >
            {users.data.data.slice(0, 10).map((user) => (
              <div
                key={user._id}
                style={{
                  border: '1px solid #e0e0e0',
                  padding: '15px',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '5px',
                    }}
                  >
                    <strong style={{ fontSize: '16px' }}>👤 {user.name}</strong>
                    <span
                      style={{
                        background:
                          user.role === 'admin'
                            ? '#e74c3c'
                            : user.role === 'teacher'
                            ? '#3498db'
                            : '#2ecc71',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        marginRight: '10px',
                      }}
                    >
                      {user.role === 'student'
                        ? 'دانشجو'
                        : user.role === 'teacher'
                        ? 'استاد'
                        : 'مدیر'}
                    </span>
                  </div>
                  <div style={{ color: '#666', fontSize: '14px' }}>📧 {user.email}</div>
                  <div style={{ color: '#999', fontSize: '12px', marginTop: '5px' }}>
                    📅 عضویت: {new Date(user.createdAt).toLocaleDateString('fa-IR')}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                  }}
                >
                  <button
                    style={{
                      background: '#f39c12',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    ✏️ ویرایش
                  </button>
                  <button
                    style={{
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    👁️ مشاهده
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* خلاصه آماری */}
        {stats.data?.data && (
          <div
            style={{
              marginTop: '20px',
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
            }}
          >
            <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>📊 خلاصه آماری</h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '10px',
                fontSize: '14px',
              }}
            >
              <div>
                🎯 کل کاربران: <strong>{stats.data.data.total}</strong>
              </div>
              <div>
                🎓 دانشجویان: <strong>{stats.data.data.byRole.student}</strong>
              </div>
              <div>
                👨‍🏫 اساتید: <strong>{stats.data.data.byRole.teacher}</strong>
              </div>
              <div>
                👨‍💼 مدیران: <strong>{stats.data.data.byRole.admin}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
