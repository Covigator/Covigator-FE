import Chip from '../common/chip';

export type PlaceItemProps = {
  id?: number;
  type: string;
  name: string;
  desc: string;
  img?: string;
};

const PlaceItem = ({ type, name, desc, img }: PlaceItemProps) => {
  return (
    <div className="w-full flex gap-[11px] items-center py-[9px]">
      <img className="w-[75px] h-[75px] rounded-[5px] bg-bk-40" src={img} />
      <section className="flex flex-col gap-[12px]">
        <div className="flex gap-[7px]">
          <Chip size={'sm'} state={'active'}>
            {type}
          </Chip>
          <p className="text-body4 text-bk-90">{name}</p>
        </div>
        <p className="ml-[2px] text-body6 text-bk-70">{desc}</p>
      </section>
    </div>
  );
};

export default PlaceItem;
