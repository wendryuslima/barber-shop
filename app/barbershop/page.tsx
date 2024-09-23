import BarberShopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import Search from "../_components/search"
import { db } from "../_lib/prisma"

interface BarberShopPageProps {
  searchParams: {
    search?: string
  }
}

const BarberShopPage = async ({ searchParams }: BarberShopPageProps) => {
  try {
    const searchQuery = searchParams?.search || ""

    const barbershops = await db.barbershop.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            services: {
              some: {
                name: {
                  contains: searchQuery,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
    })
    return (
      <div>
        <Header />
        <div className="my-6 px-5">
          <Search />
        </div>
        <div className="px-5">
          <h2>Resultados para {searchParams.search}</h2>
          <div className="grid grid-cols-2 gap-4 md:flex md:overflow-x-auto md:[&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => (
              <BarberShopItem barbershop={barbershop} key={barbershop.id} />
            ))}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Erro ao buscar barbearias:", error)
    return <div>Error loading barbershops</div>
  }
}

export default BarberShopPage
