import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer>
      <Card className="mt-6">
        <CardContent className="px-5 py-6">
          <p className="text-sm text-gray-400"> © 2023 Copyright FSW Barber</p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
