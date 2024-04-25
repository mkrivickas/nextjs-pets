import Link from "next/link"
import clientPromise from "../../../../lib/mongodb"
const { ObjectId } = require("mongodb")

export const metadata = {
  title: "View Contacts For a Pet"
}

async function fetchPetAndContacts(id) {
  const client = await clientPromise

  if (ObjectId.isValid(id)) {
    const pet = await client
      .db()
      .collection("pets")
      .findOne({ _id: new ObjectId(id) })
    const contacts = await client
      .db()
      .collection("contacts")
      .find({ petId: new ObjectId(id) })
      .toArray()
    return { pet, contacts }
  }

  return { pet: undefined, contacts: undefined }
}

const EditPage = async ({ params }) => {
  const { pet, contacts } = await fetchPetAndContacts(params.id)

  if (!pet) {
    return (
      <div className="page-section">
        <div style={{ zIndex: 2 }}>
          <Link href="/admin" className="small-link">
            &laquo; Pas žvėrių valdovą
          </Link>
        </div>
        <h1 className="page-section-title mb-big">Nerasta!</h1>
      </div>
    )
  }

  return (
    <>
      <div className="page-section">
        <div className="page-section-inner">
          <Link href="/admin" className="small-link">
            &laquo; Pas žvėrių valdovą
          </Link>

          <h1 className="page-section-title mb-big">Susisiekti dėl {pet.name}</h1>
          <table className="contact-list">
            <tbody>
              <tr>
                <th>Vardas</th>
                <th>E-paštas</th>
                <th>Atsiliepimas</th>
              </tr>
              {contacts.map(contact => {
                return (
                  <tr>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.comment}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default EditPage
