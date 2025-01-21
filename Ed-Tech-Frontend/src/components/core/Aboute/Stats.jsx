import React from 'react';





const Stats = [
    {count: "5K", label: "Active Student"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"}
];
export const StatsComponent = () => {
  return (
    <section>
        <div>
            <div className='flex justify-between'>{
                Stats.map( (data, index) => {
                    return (
                        <div key={index} className='flex flex-col items-center'>
                            <h1>
                                {data.count}
                            </h1>
                            <h2>
                                {data.label}
                            </h2>
                        </div>
                    )
                })
            }</div>
        </div>
    </section>
  )
}
