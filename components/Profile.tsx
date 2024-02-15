import PromptCard from "./PromptCard";

interface IProps {
  name: string;
  desc: string;
  data: any;
  handleEdit: (data: any) => void;
  handleDelete: (data: any) => void;
}

const Profile = ({ data, name, desc, handleDelete, handleEdit }: IProps) => {
  return (
    <section className="w-full ">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} </span>
        Profile
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="nt-10 prompt_layout">
        {data.map((item: any) => (
          <PromptCard
            key={item.id}
            post={item}
            handleEdit={() => handleEdit && handleEdit(item)}
            handleDelete={() => handleDelete && handleDelete(item)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
