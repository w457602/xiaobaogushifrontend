import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Settings, Bell, LogOut, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { useNavigate } from 'react-router-dom';

export default function ManagerProfile() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="bg-muted min-h-full">
      <div className="bg-background border-b border-border/50 p-5 pt-8 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">管理员</h2>
            <p className="text-sm text-muted-foreground">超级管理员</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card>
          <CardContent className="p-0">
            {[
              { label: '个人信息', icon: User },
              { label: '通知设置', icon: Bell },
              { label: '系统设置', icon: Settings },
            ].map((item, i) => (
              <button key={item.label} className={`w-full flex items-center justify-between p-4 text-sm ${i > 0 ? 'border-t' : ''}`}>
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>

        <Button variant="outline" className="w-full text-destructive" onClick={() => { logout(); navigate('/'); }}>
          <LogOut className="w-4 h-4 mr-2" /> 退出登录
        </Button>
      </div>
    </div>
  );
}
