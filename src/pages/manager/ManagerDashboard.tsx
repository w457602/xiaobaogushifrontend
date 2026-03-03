import { mockOrders, mockDashboardStats } from '@/mock/data';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/StatusBadge';
import { Link } from 'react-router-dom';
import { ClipboardCheck, AlertTriangle, ShoppingCart, Truck } from 'lucide-react';
import { AuditStatus, ProcurementAggStatus, ShippingStatus } from '@/types/enums';

const stats = mockDashboardStats;

export default function ManagerDashboard() {
  const pendingApps = mockOrders.filter(o => o.isApplication && o.auditStatus === AuditStatus.PENDING);
  const pendingShippingInfo = mockOrders.filter(
    o => o.procurementStatus === ProcurementAggStatus.READY && o.shippingStatus === ShippingStatus.NOT_SHIPPED,
  ).length;

  return (
    <div className="bg-muted min-h-full">
      <div className="bg-background border-b border-border/50 p-4 sticky top-0 z-20">
        <h1 className="text-lg font-bold text-foreground">管理工作台</h1>
        <p className="text-xs text-muted-foreground">管理员 · 今日概览</p>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '待审核申请', value: stats.pendingApplications, icon: ClipboardCheck, color: 'text-status-pending' },
            { label: '待处理订单', value: stats.pendingOrders, icon: ShoppingCart, color: 'text-status-processing' },
            { label: '采购异常', value: stats.procurementAbnormal, icon: AlertTriangle, color: 'text-status-error' },
            { label: '待录物流', value: pendingShippingInfo, icon: Truck, color: 'text-primary' },
          ].map(s => (
            <Card key={s.label}>
              <CardContent className="p-3 flex items-center gap-3">
                <s.icon className={`w-8 h-8 ${s.color}`} />
                <div>
                  <p className="text-xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold mb-3">待审核申请</h3>
            {pendingApps.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">暂无待审核申请</p>
            ) : (
              <div className="space-y-2">
                {pendingApps.map(order => (
                  <Link key={order.id} to={`/manager/applications`} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                    <div>
                      <p className="text-sm font-medium">{order.storeName}</p>
                      <p className="text-xs text-muted-foreground">{order.orderNo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">¥{order.totalSalePrice.toFixed(0)}</p>
                      {order.auditStatus && <StatusBadge status={order.auditStatus} />}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
