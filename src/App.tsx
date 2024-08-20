import "./styles.css"
import { Book, BookInformation, User } from "./lib/types"
import { getBooks, getUsers, getReviews } from "./lib/api"
import { useEffect, useState, FC } from "react"
import Card from "./Card"

// Техническое задание:
// Доработать приложение App, чтобы в отрисованном списке
// были реальные отзывы, автор книги и автор отзыва.
// Данные об отзывах и пользователях можно получить при помощи асинхронных
// функций getUsers, getReviews

// функция getBooks возвращает Promise<Book[]>
// функция getUsers возвращает Promise<User[]>
// функция getReviews возвращает Promise<Review[]>

// В объектах реализующих интерфейс Book указаны только uuid
// пользователей и обзоров

// // В объектах реализующих интерфейс BookInformation, ReviewInformation// указана полная информация об пользователе и обзоре.

const toBookInformation = (book: Book, users: User[]): BookInformation => {
  const authorName = users.find((el) => el.id === book.authorId)?.name || "avtor neizvesten"
  return {
    id: book.id,
    name: book.name || "Книга без названия",
    // array1.find((element) => element > 10);
    author: { name: authorName, id: book.authorId },
    reviews: [{ id: "test", text: "test text", user: { id: "sdf", name: "Reviewer" } }],
    description: book.description,
  }
}

const App: FC = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true)
      const fetchedBooks = await getBooks()
      setBooks(fetchedBooks)
      setIsLoading(false)
    }
    fetchBooks()
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      const resp = await getUsers()
      setUsers(resp)
      setIsLoading(false)
    }
    fetchUsers()
  }, [])

  return (
    <div>
      <h1>Мои книги:</h1>
      {isLoading && <div>Загрузка...</div>}
      {!isLoading && books.map((b) => <Card key={b.id} book={toBookInformation(b, users)} />)}
    </div>
  )
}

export default App
