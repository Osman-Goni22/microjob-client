import useWorkers from "../hooks/useWorkers";



const Workers = () => {
    const [workers] = useWorkers();
    console.log(workers);
    return (
        <div>
            <h2 className="text-2xl text-orange-300">Top Workers </h2>
            <div className="grid grid-cols-5 gap-3 hover:z-auto">
            {
                workers.map((worker, indx) =>
                    <div key={indx} className="w-[200px] shadow p-8">
                        <img src={worker.photo} alt="" className="w-24 h-24 rounded-full" />
                        <p className="text-left my-2">Name:{worker.name}</p>
                        <p className="text-left my-2">Earning Coins: {worker.coin}</p>
                        <p className="text-left my-2">Email: {worker.email}</p>
                    </div>

                )
            }
            </div>

        </div>
    );
};

export default Workers;