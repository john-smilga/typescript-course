type BasicProfileCardProps = {
  type: 'basic';
  name: string;
};

type DetailedProfileCardProps = {
  type: 'detailed';
  name: string;
  email: string;
};
type ProfileCardProps = BasicProfileCardProps | DetailedProfileCardProps;
function Component(props: ProfileCardProps) {
  const { type, name } = props;
  if (type === 'basic')
    return (
      <article>
        <h2>{name}</h2>
      </article>
    );

  return (
    <article>
      <h2>{name}</h2>
      <h2>{props.email}</h2>
    </article>
  );
}
export default Component;
