import axios from "axios";
import React from "react";

function App() {
  const [list, setList] = React.useState([]);
  const [form, setForm] = React.useState({});
  const [id, setId] = React.useState("");

  function valueInput({ target }) {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  }

  async function getList() {
    const res = await axios.get(
      "https://64e7ab01b0fd9648b7903ce3.mockapi.io/usuarios/usuarios"
    );
    setList(res.data);
    console.log(res.data);
  }
  React.useEffect(() => {
    getList();
  }, []);

  async function postList(data) {
    const postar = await axios.post(
      "https://64e7ab01b0fd9648b7903ce3.mockapi.io/usuarios/usuarios",
      data
    );
    setList([...list, postar.data]);
    await getList();
  }

  function sendList(event) {
    event.preventDefault();
    postList({
      name: event.target["name"].value,
      sobrenome: event.target["sobrenome"].value,
      email: event.target["email"].value,
      phone: event.target["phone"].value,
    });
    (event.target["name"].value = ""),
      (event.target["sobrenome"].value = ""),
      (event.target["email"].value = ""),
      (event.target["phone"].value = "");
  }

  async function updateList(id){
    await axios.put(`https://64e7ab01b0fd9648b7903ce3.mockapi.io/usuarios/usuarios/${id}`,form)
    setId('')
    setForm({})

    const findIndexList = list.findIndex((u)=> u.id===id )
    list[findIndexList] = {
      ...list[findIndexList],
      name: form.name,
      sobrenome: form.sobrenome,
      email: form.email,
      phone: form.phone ,
    }
  }

  function editList(list){
    setId(list.id)
    setForm(list)
  }

  async function deleteList(id) {
    await axios.delete(
      `https://64e7ab01b0fd9648b7903ce3.mockapi.io/usuarios/usuarios/${id}`
    );
    await getList();
  }

  return (
    <>
      <div>
        {list.length === 0
          ? "Lista vazia"
          : list.map((list) => (
              <ul key={list.id}>
                <li>
                  {" "}
                  {id === list.id ? (
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={form.name}
                      onChange={valueInput}
                    />
                  ) : (
                    list.name
                  )}
                </li>{" "}
                <li>
                  {" "}
                  {id === list.id ? (
                    <input
                      type="text"
                      name="sobrenome"
                      id="sobrenome"
                      value={form.sobrenome}
                      onChange={valueInput}
                    />
                  ) : (
                    list.sobrenome
                  )}
                </li>{" "}
                <li>
                  {" "}
                  {id === list.id ? (
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={form.email}
                      onChange={valueInput}
                    />
                  ) : (
                    list.email
                  )}
                </li>{" "}
                <li>
                  {" "}
                  {id === list.id ? (
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      value={form.phone}
                      onChange={valueInput}
                    />
                  ) : (
                    list.phone
                  )}
                </li>{" "}
                <li>
                  {id === list.id ? (
                    <button onClick={(()=> updateList(list.id))}>Salvar</button>
                  ) : (
                    <button onClick={(()=> editList(list))}>Editar</button>
                  )}
                  <button onClick={(()=> deleteList(list.id))}>deletar</button>
                </li>
              </ul>
            ))}
      </div>
      <div>
        <form onSubmit={sendList}>
          <label>
            Nome <input type="text" name="name" id="name" />
          </label>
          <label>
            Sobrenome <input type="text" name="sobrenome" id="sobrenome" />
          </label>
          <label>
            Email <input type="email" name="email" id="email" />
          </label>
          <label>
            Telefone <input type="phone" name="phone" id="phone" />
          </label>
          <button>Enviar</button>
        </form>
      </div>
    </>
  );
}

export default App;
