import Card from './Card'
import Image from 'next/image'
import logo from '@/assets/images/logo.png'
import SidebarLink from './SidebarLink'

const links = [
  { label: 'Home', icon: 'Grid' as const, link: '/home' },
  {
    label: 'Calendar',
    icon: 'Calendar' as const,
    link: '/calendar',
  },
  { label: 'Profile', icon: 'User' as const, link: '/profile' },
  {
    label: 'Settings',
    icon: 'Settings' as const,
    link: '/settings',
  },
]

export type MyLink = (typeof links)[number]

const Sidebar = () => {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      {/* <div className="w-full flex justify-center items-center">
        <Image src={logo} alt="Able logo" priority className="w-14" />
      </div> */}
      {links.map((link, index) => (
        <SidebarLink link={link} key={index} />
      ))}
    </Card>
  )
}

export default Sidebar
