interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

const StatCard = ({ value, label, icon }: StatCardProps) => {
  return (
    <div className="text-center p-6 rounded-2xl bg-card border border-border">
      {icon && (
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      )}
      <div className="font-heading font-bold text-3xl md:text-4xl text-primary mb-1">
        {value}
      </div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </div>
  );
};

export default StatCard;
