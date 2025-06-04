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

const adminBase = "/directorio/admin";

export const menuConfig = [
  
  {
    section: "Principal",
    items: [
      {
        name: "Dashboard",
        path: `${adminBase}/`,
        icon: <DashboardIcon className="icon" />,
      },
    ],
  },
  {
    section: "GESTIÓN GENERAL",
    items: [
      {
        name: "Sedes",
        path: `${adminBase}/sede`, // Actualización aquí
        icon: <LocationCityIcon className="icon" />,
      },
      {
        name: "Espacios",
        path: `${adminBase}/espacio`, // Actualización aquí
        icon: <PlaceIcon className="icon" />,
      },
      {
        name: "Ubicaciones",
        path: `${adminBase}/ubicacion`, // Actualización aquí
        icon: <ApartmentIcon className="icon" />,
      },
    ],
  },
  {
    section: "ORGANIZACIÓN",
    items: [
      {
        name: "Tipo Dependencias",
        path: `${adminBase}/tipodependencia`, // Actualización aquí
        icon: <CategoryIcon className="icon" />,
      },
      {
        name: "Dependencias",
        path: `${adminBase}/dependencia`, // Actualización aquí
        icon: <CorporateFareIcon className="icon" />,
      },
    ],
  },
  {
    section: "PERSONAS Y VINCULACIONES",
    items: [
      {
        name: "Personas",
        path: `${adminBase}/persona`, // Actualización aquí
        icon: <BadgeIcon className="icon" />,
      },
      {
        name: "Vinculaciones",
        path: `${adminBase}/vinculacion`, // Actualización aquí
        icon: <AssignmentIndIcon className="icon" />,
      },
      {
        name: "Tipo Vinculación",
        path: `${adminBase}/tipovinculacion`, // Actualización aquí
        icon: <LinkIcon className="icon" />,
      },
      {
        name: "Cargos",
        path: `${adminBase}/cargo`, // Actualización aquí
        icon: <WorkOutlineIcon className="icon" />,
      },
    ],
  },
  {
    section: "CONTACTOS",
    items: [
      {
        name: "Tipo Documentos",
        path: `${adminBase}/tipodocumento`, // Actualización aquí
        icon: <DescriptionIcon className="icon" />,
      },
      {
        name: "Tipo Contactos",
        path: `${adminBase}/tipocontacto`, // Actualización aquí
        icon: <MailIcon className="icon" />,
      },
      {
        name: "Contactos Persona",
        path: `${adminBase}/contactopersona`, // Actualización aquí
        icon: <ContactsIcon className="icon" />,
      },
      {
        name: "Contactos Dependencia",
        path: `${adminBase}/contactodependencia`, // Actualización aquí
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
