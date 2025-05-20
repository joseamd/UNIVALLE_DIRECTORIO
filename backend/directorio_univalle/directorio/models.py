from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


# -------------------------
# Auditoria
# -------------------------
class AuditoriaBase(models.Model):
    created = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated = models.DateTimeField(auto_now=True, null=True, blank=True)
    usuario = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        abstract = True

# -------------------------
# Entidades institucionales
# -------------------------

class Sede(AuditoriaBase):
    nombre = models.CharField(max_length=150)
    ciudad = models.CharField(max_length=100)
    direccion = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name = "Sede"
        verbose_name_plural = "Sedes"
        ordering = ['nombre']


class Edificio(AuditoriaBase):
    sede = models.ForeignKey(Sede, on_delete=models.PROTECT, related_name='edificios')
    codigo = models.CharField(max_length=20, unique=True)
    nombre = models.CharField(max_length=150)    

    def __str__(self):
        return f"{self.codigo} - {self.nombre}"
    
    class Meta:
        ordering = ['sede__nombre', 'codigo']


class Ubicacion(AuditoriaBase):
    edificio = models.OneToOneField(Edificio, on_delete=models.PROTECT, related_name='ubicacion')
    piso = models.IntegerField()
    latitud = models.FloatField()
    longitud = models.FloatField()

    def __str__(self):
        return f"{self.edificio.codigo} Piso {self.piso}"
    
    class Meta:
        verbose_name = "Ubicación"
        verbose_name_plural = "Ubicaciones"
    

# -------------------------
# Catálogos básicos
# -------------------------
class TipoDependencia(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre
    
    class Meta:
        ordering = ['nombre']


class TipoDocumento(models.Model):
    nombre = models.CharField(max_length=10)  # Ej: 'C.C.'
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name = "Tipo de documento"
        verbose_name_plural = "Tipos de documento"
        ordering = ['nombre']


class TipoContacto(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name = "Tipo de contacto"
        verbose_name_plural = "Tipos de contacto"
        ordering = ['nombre']


class TipoVinculacion(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name = "Tipo de vinculación"
        verbose_name_plural = "Tipos de vinculación"
        ordering = ['nombre']


class Cargo(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)    

    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name = "Cargo"
        verbose_name_plural = "Cargos"
        ordering = ['nombre']

# -------------------------
# Organización interna
# -------------------------

class Dependencia(AuditoriaBase):
    nombre = models.CharField(max_length=150)
    tipo_dependencia = models.ForeignKey(TipoDependencia, on_delete=models.CASCADE, related_name='dependencias')
    dependencia_padre = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='sub_dependencias')
    ubicacion = models.ForeignKey(Ubicacion, on_delete=models.SET_NULL, related_name='dependencias', null=True, blank=True)

    def __str__(self):
        return self.nombre
    
    class Meta:
        ordering = ['nombre']


# -------------------------
# Personas y contactos
# -------------------------

class Persona(AuditoriaBase):
    tipo_documento = models.ForeignKey('TipoDocumento', on_delete=models.PROTECT)
    numero_documento = models.CharField(max_length=50, unique=True)
    primer_nombre = models.CharField(max_length=50)
    segundo_nombre = models.CharField(max_length=50, blank=True, null=True)
    primer_apellido = models.CharField(max_length=50)
    segundo_apellido = models.CharField(max_length=50, blank=True, null=True)    

    @property
    def nombre_completo(self):
        nombres = f"{self.primer_nombre} {self.segundo_nombre or ''}".strip()
        apellidos = f"{self.primer_apellido} {self.segundo_apellido or ''}".strip()
        return f"{nombres} {apellidos}".strip()

    def __str__(self):
        return self.nombre_completo
    
    class Meta:
        verbose_name = "Persona"
        verbose_name_plural = "Personas"
        ordering = ['primer_apellido', 'segundo_apellido', 'primer_nombre']


class ContactoPersona(AuditoriaBase):
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, related_name='contactos')
    tipo_contacto = models.ForeignKey(TipoContacto, on_delete=models.PROTECT)
    valor = models.CharField(max_length=100)
    extension = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return f"{self.valor} ({self.tipo_contacto.nombre})"
    
    class Meta:
        ordering = ['tipo_contacto__nombre', 'valor']


class ContactoDependencia(AuditoriaBase):
    dependencia = models.ForeignKey(Dependencia, on_delete=models.CASCADE, related_name='contactos')
    tipo_contacto = models.ForeignKey(TipoContacto, on_delete=models.PROTECT)
    valor = models.CharField(max_length=100)
    extension = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return f"{self.valor} ({self.tipo_contacto.nombre})"
    
    class Meta:
        ordering = ['tipo_contacto__nombre', 'valor']

# -------------------------
# Vinculaciones laborales
# -------------------------

class Vinculacion(AuditoriaBase):
    ESTADO_CHOICES = [
        ('activo', 'Activo'),
        ('inactivo', 'Inactivo'),
    ]

    persona = models.ForeignKey(Persona, on_delete=models.CASCADE)
    tipo_vinculacion = models.ForeignKey(TipoVinculacion, on_delete=models.CASCADE)
    cargo = models.ForeignKey(Cargo, on_delete=models.CASCADE)
    dependencia = models.ForeignKey(Dependencia, on_delete=models.CASCADE)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField(blank=True, null=True)
    estado_laboral = models.CharField(max_length=10, choices=ESTADO_CHOICES)

    def __str__(self):
        return f"{self.persona} - {self.dependencia.nombre} ({self.estado_laboral})"
    
    class Meta:
        verbose_name = "Vinculacion"
        verbose_name_plural = "Vinculaciones"
        ordering = ['-fecha_inicio', 'persona__primer_apellido']
