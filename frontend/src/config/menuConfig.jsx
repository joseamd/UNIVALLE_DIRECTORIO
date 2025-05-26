// src/config/menuConfig.js
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PlaceIcon from '@mui/icons-material/Place';
import CategoryIcon from '@mui/icons-material/Category';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import BadgeIcon from '@mui/icons-material/Badge';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LinkIcon from '@mui/icons-material/Link';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import MailIcon from '@mui/icons-material/Mail';
import ContactsIcon from '@mui/icons-material/Contacts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

export const menuConfig = [
  {
    section: "Principal",
    items: [
      {
        name: "Dashboard",
        path: "/",
        icon: <DashboardIcon className="icon" />,
      },
    ],
  },
  {
    section: "GESTIÓN GENERAL",
    items: [
      {
        name: "Sedes",
        path: "/sede", // Actualización aquí
        icon: <LocationCityIcon className="icon" />,
      },
      {
        name: "Espacios",
        path: "/espacio", // Actualización aquí
        icon: <PlaceIcon className="icon" />,
      },
      {
        name: "Ubicaciones",
        path: "/ubicacion", // Actualización aquí
        icon: <ApartmentIcon className="icon" />,
      },
    ],
  },
  {
    section: "ORGANIZACIÓN",
    items: [
      {
        name: "Tipo Dependencias",
        path: "/tipodependencia", // Actualización aquí
        icon: <CategoryIcon className="icon" />,
      },
      {
        name: "Dependencias",
        path: "/dependencia", // Actualización aquí
        icon: <CorporateFareIcon className="icon" />,
      },
    ],
  },
  {
    section: "PERSONAS Y VINCULACIONES",
    items: [
      {
        name: "Personas",
        path: "/persona", // Actualización aquí
        icon: <BadgeIcon className="icon" />,
      },
      {
        name: "Vinculaciones",
        path: "/vinculacion", // Actualización aquí
        icon: <AssignmentIndIcon className="icon" />,
      },
      {
        name: "Tipo Vinculación",
        path: "/tipovinculacion", // Actualización aquí
        icon: <LinkIcon className="icon" />,
      },
      {
        name: "Cargos",
        path: "/cargo", // Actualización aquí
        icon: <WorkOutlineIcon className="icon" />,
      },
    ],
  },
  {
    section: "CONTACTOS",
    items: [
      {
        name: "Tipo Documentos",
        path: "/tipodocumento", // Actualización aquí
        icon: <DescriptionIcon className="icon" />,
      },
      {
        name: "Tipo Contactos",
        path: "/tipocontacto", // Actualización aquí
        icon: <MailIcon className="icon" />,
      },
      {
        name: "Contactos Persona",
        path: "/contactopersona", // Actualización aquí
        icon: <ContactsIcon className="icon" />,
      },
      {
        name: "Contactos Dependencia",
        path: "/contactodependencia", // Actualización aquí
        icon: <ContactsIcon className="icon" />,
      },
    ],
  },
  {
    section: "USUARIO",
    items: [
      {
        name: "Perfil",
        path: "/perfil",
        icon: <AccountCircleIcon className="icon" />,
      },
      {
        name: "Cerrar sesión",
        path: "/logout",
        icon: <LogoutIcon className="icon" />,
      },
    ],
  },
];
