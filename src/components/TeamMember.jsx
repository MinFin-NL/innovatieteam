export default function TeamMember({ member }) {
  return (
    <div className="app-team-member">
      <div className="app-team-member__meta">
        <div className="app-team-member__name">{member.name}</div>
        <div className="app-team-member__role">{member.role}</div>
      </div>
      <div className="app-team-member__photo-wrap">
        <img
          className="app-team-member__photo"
          src={member.photo}
          alt={member.name}
        />
      </div>
    </div>
  );
}
