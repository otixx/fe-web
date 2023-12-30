import sad from "/sad.gif";
export interface INotfoundProps {
  title: string;
  description: string;
}
const Notfound = ({ title, description }: INotfoundProps) => {
  return (
    <section>
      <div className="container mx-auto  px-4 py-8 lg:px-6 lg:py-16">
        <div className="flex flex-col items-center justify-start">
          <img src={sad} alt="sad" />
          <p className="mb-4 text-3xl font-bold tracking-tight text-mainColors  md:text-4xl">
            {title}
          </p>
          <p className="mb-4 text-lg font-light text-mainColors">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Notfound;
