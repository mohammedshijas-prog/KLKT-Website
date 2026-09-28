const card = "relative overflow-hidden rounded-[8px] bg-[#f5f5f7] p-6 min-h-[420px] lg:h-[448px]";
const title = "text-[22px] leading-7 font-medium text-[#0c0a08] sm:text-[24px]";

const payments = [
  {
    name: "Solana Wallet",
    detail: "••••4829",
    added: "Added Aug 15, 2025",
    icon: "/home-2/tasks/solana.png",
    round: false,
    def: true,
  },
  {
    name: "Vemmo",
    detail: "@john-doe",
    added: "Added Aug 15, 2025",
    icon: "/home-2/tasks/vemmo.png",
    round: true,
    def: false,
  },
  {
    name: "PayPal",
    detail: "@john-doe",
    added: "Added Dec 09, 2021",
    icon: "/home-2/tasks/paypal.png",
    round: true,
    def: false,
  },
] as const;

function Battery({ value }: { value: string }) {
  return (
    <span className="absolute top-3 right-3 inline-flex h-6 items-center gap-0.5 rounded-full bg-white px-1 text-[12px] text-black">
      <img src="/home-2/tasks/battery.svg" alt="" width={11} height={8} />
      {value}
    </span>
  );
}

function DeviceRow({
  image,
  name,
  product,
  paired,
  battery,
  flip,
}: {
  image: string;
  name: string;
  product: string;
  paired: boolean;
  battery?: string;
  flip?: boolean;
}) {
  return (
    <div className="relative flex h-[129px] w-full items-center gap-3 overflow-hidden rounded-[26px] border border-white/40 bg-gradient-to-b from-white/30 to-white/70 py-2 pr-3 pl-2 shadow-[0_4px_15px_rgba(172,172,172,0.1)]">
      <div className="flex size-[113px] shrink-0 items-center justify-center overflow-hidden rounded-[20px] bg-white">
        <img
          src={image}
          alt=""
          className={`h-[86px] w-auto max-w-none object-contain ${flip ? "-scale-x-100" : ""}`}
        />
      </div>
      <div className="min-w-0 flex-1 pr-10">
        <p className="text-[16px] leading-[1.2] font-medium text-black">{name}</p>
        <p className="mt-2 text-[14px] leading-[1.2] text-black/80">{product}</p>
        <p className={`mt-3 flex items-center gap-1 text-[12px] leading-[1.2] font-medium ${paired ? "text-[#008869]" : "text-[#e10004]"}`}>
          <img src={paired ? "/home-2/tasks/check.svg" : "/home-2/tasks/fail.svg"} alt="" width={13} height={13} />
          {paired ? "Paired and Connected" : "Pairing Failed"}
        </p>
        {paired ? null : (
          <p className="mt-2 flex items-center text-[12px] leading-[1.2]">
            <span className="inline-flex items-center gap-0.5 text-black">
              Retry Pairing
              <img src="/home-2/tasks/retry.svg" alt="" width={14} height={14} />
            </span>
            <span className="ml-3 text-black/70">Troubleshoot</span>
          </p>
        )}
      </div>
      {battery ? <Battery value={battery} /> : null}
    </div>
  );
}

export function HomeTwoTasks() {
  return (
    <div className="mt-8 flex flex-col gap-3">
      <div className="grid gap-3 lg:grid-cols-2">
        <article className={`${card} flex flex-col`}>
          <h3 className={title}>Know what you do. Know what you get.</h3>
          <div className="mt-8 flex flex-1 flex-col justify-end gap-3 pb-2">
            <p className="self-end rounded-[14px] bg-[#9463ff] px-4 py-2 text-[15px] leading-7 text-white shadow-[0_10px_12px_rgba(79,41,204,0.16)]">
              What should I record next?
            </p>
            <p className="rounded-[20px] bg-white px-4 py-4 text-[15px] leading-normal text-black">
              Next: restock the shelves in aisle 4. Keep both hands in view and face the shelf while you work.
            </p>
            <div className="flex items-start justify-between gap-3 overflow-hidden rounded-[15px] border border-white bg-white/60 px-4 py-3">
              <div className="flex min-h-[85px] flex-col justify-between">
                <div>
                  <p className="text-[16px] font-medium text-[#13111c]">Restock shelves</p>
                  <p className="text-[11px] text-[#635e7d]">Aisle 4 · task 5 of 6</p>
                </div>
                <span className="inline-flex h-7 w-[95px] items-center justify-center rounded-[7px] bg-[#7c40ff] text-[12px] font-semibold text-white">
                  Start task
                </span>
              </div>
              <img src="/home-2/tasks/box.png" alt="" width={105} height={105} className="size-[105px] object-contain" />
            </div>
          </div>
        </article>

        <article className={card}>
          <h3 className={title}>Pair once. Record all shift.</h3>
          <div className="absolute inset-x-4 top-[92px] flex flex-col gap-2.5 sm:inset-x-6 sm:top-[108px]">
            <DeviceRow
              image="/home-2/tasks/headset.png"
              name="Head Camera"
              product="Oculus Headset"
              paired
              battery="88%"
            />
            <DeviceRow
              image="/home-2/tasks/wrist.png"
              name="Right Wrist Camera"
              product="Oculus Right Wrist"
              paired={false}
            />
            <DeviceRow
              image="/home-2/tasks/wrist.png"
              name="Left Wrist Camera"
              product="Oculus Left Wrist"
              paired
              battery="88%"
              flip
            />
          </div>
        </article>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <article className={card}>
          <h3 className={title}>Paid in dollars, not promises</h3>
          <div className="mt-8 rounded-[15px] bg-white px-4 py-6">
            <div className="flex items-center justify-between text-[14px] leading-5 tracking-[0.3px] uppercase">
              <p className="text-[#8e8e93]">Connected Payment Method</p>
              <p className="font-semibold text-[#5c5c5c]">03</p>
            </div>
            <ul className="mt-3">
              {payments.map((method, index) => (
                <li
                  key={method.name}
                  className={`flex items-center gap-3 py-3.5 ${index < payments.length - 1 ? "border-b border-[rgba(198,198,200,0.5)]" : ""}`}
                >
                  <img
                    src={method.icon}
                    alt=""
                    width={36}
                    height={36}
                    className={`size-9 object-cover shadow-[3px_6px_14px_rgba(0,0,0,0.08)] ${method.round ? "rounded-full" : "rounded-[12px]"}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-[16px] leading-5 font-medium text-black">
                      {method.name}
                      {method.def ? (
                        <span className="inline-flex items-center gap-1 rounded-[10px] bg-[#007aff]/10 px-1.5 py-0.5 text-[10px] font-normal tracking-normal text-[#007aff] normal-case">
                          <img src="/home-2/tasks/star.svg" alt="" width={10} height={10} />
                          Default
                        </span>
                      ) : null}
                    </p>
                    <p className="text-[14px] leading-4 text-black/70">{method.detail}</p>
                    <p className="text-[12px] leading-5 text-[#8e8e93]">{method.added}</p>
                  </div>
                  <img src="/home-2/tasks/more.svg" alt="" width={20} height={20} />
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className={`${card} flex flex-col`}>
          <h3 className={title}>Money you can actually spend</h3>
          <img
            src="/home-2/tasks/cash.png"
            alt="Cash available balance and cashout"
            className="mt-auto w-full object-contain"
          />
        </article>

        <article className={card}>
          <h3 className={`${title} relative z-10`}>Free to join. Free to stay.</h3>
          <div className="pointer-events-none absolute inset-x-0 top-16 bottom-0 overflow-hidden">
            <img
              src="/home-2/tasks/wearer.png"
              alt=""
              className="absolute top-[-6%] left-1/2 h-[175%] w-auto max-w-none -translate-x-[46%]"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
