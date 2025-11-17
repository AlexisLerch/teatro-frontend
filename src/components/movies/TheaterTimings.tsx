import dayjs from "dayjs"
import { useState } from "react";
import { theatres } from "../../utils/constants";

const TheaterTimings = () => {

    const today = dayjs();
    const [selectDate, setSelectDate] = useState(today);
    const formattedDate = selectDate.format('DD-MM-YY');
    const next7days = Array.from({ length: 7 }, (_, i) => today.add(i, 'day'));

  return (
    <>
      <hr className="my-2 border-gray-200" />
      <div className="flex items-center gap-2 mb-4 overflow-x-auto py-4 px-2">
        {
            next7days.map((date, i) => {
                const isSelected = selectDate.isSame(date, 'day');
                return (
                    <button key={i} onClick={() => setSelectDate(date)} 
                    className={`flex cursor-pointer flex-col border border-gray-200 items-center px-3 py-2 rounded-lg min-w-[50px] ${isSelected ? 'bg-white text-black font-semibold' : 'text-white hover:bg-gray-700'}`}>
                        <span className="text-sm font-black">
                            {date.format('D')}    
                        </span>
                        <span className="text-xs">
                            {date.format('ddd')}
                        </span>
                        <span className="text-[10px]">
                            {date.format('MMM')}
                        </span>
                    </button>
                )
            })
        }
      </div>

      <div className="space-y-8 px-4 mb-10">
        {
            theatres.map((theatre, i) => (
                <div key={i}>
                    <div className="flex items-start gap-3 mb-2">
                    <img src={theatre.img} alt="logo" className="w-8 h-8 object-contain" />
                    <div>
                        <h2 className="text-sm font-semibold">{theatre.name}</h2>
                        <p className="text-sm text-gray-500">Allows Cancellation</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 ml-11">
                    {
                        theatre.timings.map((slot, i) => (
                            <button key={i} className="border border-gray-300 px-8 py-2 rounded-lg cursor-pointer text-sm flex flex-col hover:bg-gray-700 text-white"><span className="leading-tight font-semibold">{slot.time}</span>
                            <span className="text-[10px] text-white font-black"> {slot.label}</span>
                            </button>
                        ))
                    }
                </div>
                </div>
            ))
        }
      </div>
    </>
  )
}

export default TheaterTimings