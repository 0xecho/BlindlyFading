import React from "react";
import ReactDOM from "react-dom/client";

import trpc from "./trpc";
import "./index.css";
import type { User } from "@api/models/User";

type UserListProps = {
  selectedId: string | undefined;
  onUserSelected: (id: string) => void;
  reRender: any;
};
function UserList(props: UserListProps) {
  const { onUserSelected, selectedId, reRender } = props;
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    trpc.userList.query().then((newUsers) => {
      setUsers(newUsers);
    });
  }, [reRender]);

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li
          key={user.id}
          className="user-item"
          onClick={() => onUserSelected(user.id)}
        >
          {selectedId === user.id && <h2>*</h2>}
          <h3>
            #{user.id}: {user.name}
          </h3>
        </li>
      ))}
    </ul>
  );
}

type UserDetailProps = { id: string };
function UserDetail(props: UserDetailProps) {
  const { id } = props;
  const [user, setUser] = React.useState<User | undefined | null>(undefined);

  React.useEffect(() => {
    trpc.userById
      .query(id)
      .then((newUser) => {
        setUser(newUser);
      })
      .catch((err) => {
        setUser(null);
        alert(err);
      });
  }, [id]);

  return (
    <div>
      {user === undefined ? (
        <div className="user">loading user #{id}</div>
      ) : user !== null ? (
        <div className="user">
          <h3>
            #{user.id}: {user.name}
          </h3>
        </div>
      ) : (
        <div className="user">user1 #{id} not found</div>
      )}
    </div>
  );
}
type UserFormProps = { onCreateUser: (user: User) => void };
function UserForm(props: UserFormProps) {
  const [inputText, setInputText] = React.useState("");
  function handleCreateUser(name: string) {
    const { onCreateUser } = props;
    trpc.userCreate.mutate({ name }).then((user) => onCreateUser(user));
    setInputText("");
  }

  return (
    <div>
      Create new user:
      <input
        type="text"
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      <button onClick={() => handleCreateUser(inputText)}>Create</button>
    </div>
  );
}

function Users() {
  const [selectedUserId, setUser] = React.useState<string | undefined>(
    undefined
  );
  const [reRender, setReRender] = React.useState<any>(undefined);

  return (
    <>
      <UserForm
        onCreateUser={(user) => {
          setReRender(user);
        }}
      />
      <UserList
        selectedId={selectedUserId}
        onUserSelected={(id) => setUser(id)}
        reRender={reRender}
      />
      {selectedUserId ? (
        <UserDetail id={selectedUserId} />
      ) : (
        <div>select user</div>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <h1>
      Bam! Initial Page using <em>React</em>!
    </h1>
    <Users />
  </React.StrictMode>
);
