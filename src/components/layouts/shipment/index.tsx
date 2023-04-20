
interface ShipmentProps {
  courierDelivery: boolean;
  selfDelivery: boolean;
}

const Shipment: React.FC<ShipmentProps> = ({ courierDelivery, selfDelivery }) => {
  return (
    <div className="">
      <div className="text-sm" >
        {courierDelivery && (
          <div className="">
            Курьером — <span>сегодня</span>
          </div>
        )}
        {selfDelivery && (
          <div className="">
            Самовывоз — <span>сегодня</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shipment;
