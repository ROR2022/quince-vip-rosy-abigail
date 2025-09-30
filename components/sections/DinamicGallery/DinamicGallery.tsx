'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Users, Calendar, RefreshCw, Filter, ChevronLeft, ChevronRight, Loader2, AlertCircle, Heart, Cloud, Server, Trash2, Image as ImageIcon, ArrowUp, Grid3X3, Play } from 'lucide-react';
import { useHybridGallery } from './hooks/useHybridGallery';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import PhotoDetailModal from './PhotoDetailModal';
import SimpleMusicPlayer from '../SimpleMusicPlayer';
import PhotoCarouselView from './components/PhotoCarouselView';
import Link from 'next/link';

// Tipos importados del hook híbrido - usar la misma interfaz
interface HybridPhoto {
  id: string;
  originalName: string;
  uploaderName: string;
  uploadedAt: string;
  size: number;
  eventMoment: string;
  comment?: string;
  displayUrl: string;        
  thumbnailUrl?: string;     
  source: 'cloudinary' | 'local'; 
  filename: string;
  mimeType: string;
  dimensions: {
    width: number;
    height: number;
  };
  viewCount?: number;
  status: string;
  isPublic: boolean;
}

// Paleta Aurora VIP Mejorada para Quinceañera - Mayor Contraste y Visibilidad
const VIP_COLORS = {
  rosaAurora: '#E91E63',      // Rosa principal - mayor contraste
  lavandaAurora: '#9C27B0',   // Púrpura principal - más visible
  oroAurora: '#FF9800',       // Naranja dorado - muy visible
  blancoSeda: '#FFFFFF',      // Blanco puro - máximo contraste
  cremaSuave: '#F5F5F5',      // Gris claro - mejor contraste
  rosaIntensa: '#C2185B',     // Rosa intenso - excelente legibilidad
  lavandaIntensa: '#7B1FA2',  // Púrpura intenso - alto contraste
  oroIntensio: '#F57C00',     // Naranja intenso - muy legible
  rosaDelicada: '#F8BBD9'     // Rosa suave pero visible
};

/**
 * Componente para mostrar fotos subidas dinámicamente por los invitados a la quinceañera
 */
const DinamicGallery: React.FC = () => {
  const { 
    photos, 
    loading, 
    error, 
    stats, 
    pagination, 
    filters, 
    setFilters, 
    refresh,
    goToPage,
    getPhotoDisplayUrl,
    // 🗑️ Funciones de eliminación
    deletePhoto,
    isPhotoDeleting,
    deleteError,
    clearDeleteError
  } = useHybridGallery();

  // 🐛 DEBUG: Log del estado de paginación
  console.log('🔍 DinamicGallery DEBUG - Estado de paginación:', {
    pagination,
    photosCount: photos.length,
    loading,
    error,
    fullPagination: pagination ? JSON.stringify(pagination, null, 2) : 'null'
  });

  const [selectedPhoto, setSelectedPhoto] = useState<HybridPhoto | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  
  // 🗑️ Estados para eliminación
  const [photoToDelete, setPhotoToDelete] = useState<HybridPhoto | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Función para formatear tamaño de archivo
  /* const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }; */

  // 🗑️ Handlers para eliminación
  const handleDeleteClick = (photo: HybridPhoto, e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar abrir modal de vista
    setPhotoToDelete(photo);
    setShowDeleteModal(true);
    // Limpiar error anterior si existe
    if (deleteError) {
      clearDeleteError();
    }
  };

  // 🐛 DEBUG: Handler para navegación de páginas
  const handleGoToPage = (pageNumber: number) => {
    console.log('🔍 DinamicGallery DEBUG - handleGoToPage llamado:', {
      pageNumber,
      currentPage: pagination?.page,
      totalPages: pagination?.pages,
      hasNext: pagination?.hasNext,
      hasPrev: pagination?.hasPrev
    });
    goToPage(pageNumber);
  };

  const handleConfirmDelete = async (photoId: string) => {
    const success = await deletePhoto(photoId);
    if (success) {
      setShowDeleteModal(false);
      setPhotoToDelete(null);
      // Opcional: podrías agregar un toast de éxito aquí
    }
    // Si hay error, el modal se mantendrá abierto y se mostrará el error
  };

  const handleCloseDeleteModal = () => {
    if (!photoToDelete || !isPhotoDeleting(photoToDelete.id)) {
      setShowDeleteModal(false);
      setPhotoToDelete(null);
      clearDeleteError();
    }
  };

  // Si no hay fotos y no está cargando, mostrar mensaje
  if (!loading && photos.length === 0 && !error) {
    return (
      <section 
        className="py-16 px-4 text-center"
        style={{
          background: `linear-gradient(135deg, ${VIP_COLORS.blancoSeda} 0%, ${VIP_COLORS.cremaSuave} 100%)`,
        }}
      >
        
        <div className="max-w-2xl mx-auto">
          
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 vip-pulse-aurora"
            style={{
              background: `linear-gradient(135deg, ${VIP_COLORS.oroAurora}, ${VIP_COLORS.oroIntensio})`
            }}
          >
            <Camera size={32} style={{ color: VIP_COLORS.rosaIntensa }} />
          </div>
          
          <h3 
            className="text-2xl font-semibold mb-4"
            style={{ color: VIP_COLORS.rosaAurora }}
          >
            ¡Sé el primero en compartir!
          </h3>
          
          <p 
            className="text-lg"
            style={{ color: VIP_COLORS.rosaIntensa }}
          >
            Aún no hay fotos subidas. Usa el FotoUploader para compartir tus mejores momentos.
          </p>
          <div>
            <Link
              href="/fotos"
              className="inline-flex items-center px-6 py-3 rounded-full text-white font-semibold shadow-lg vip-shimmer-aurora hover:scale-105 transition-transform duration-300"
              style={{
                background: `linear-gradient(135deg, ${VIP_COLORS.rosaAurora}, ${VIP_COLORS.lavandaAurora})`
              }}
            >
              <Camera size={20} className="mr-2" />
              Subir Fotos
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="py-16 px-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${VIP_COLORS.blancoSeda} 0%, ${VIP_COLORS.cremaSuave} 50%, ${VIP_COLORS.blancoSeda} 100%)`,
      }}
    >
      {/* Elementos decorativos Aurora Pastel */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full vip-pulse-aurora" style={{ backgroundColor: VIP_COLORS.rosaAurora }}></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full vip-shimmer-aurora" style={{ backgroundColor: VIP_COLORS.lavandaAurora }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div 
            className="inline-block text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-xl border-2 vip-shimmer-aurora"
            style={{ 
              background: `linear-gradient(135deg, ${VIP_COLORS.rosaAurora}, ${VIP_COLORS.lavandaAurora})`,
              borderColor: `${VIP_COLORS.oroAurora}40`
            }}
          >
            📸 Galería Colaborativa
          </div>
          
          <h2 
            className="text-4xl md:text-5xl font-light mb-4"
            style={{ color: VIP_COLORS.rosaAurora }}
          >
            Momentos Compartidos
          </h2>
          <SimpleMusicPlayer />
          {/* {stats && (
            <p 
              className="text-xl mb-2 font-medium"
              style={{ color: VIP_COLORS.rosaIntensa }}
            >
              {stats.totalPhotos} foto{stats.totalPhotos !== 1 ? 's' : ''} compartida{stats.totalPhotos !== 1 ? 's' : ''} por {stats.uploaders.length} invitado{stats.uploaders.length !== 1 ? 's' : ''}
              <br />
              <span className="text-sm opacity-75">
                📁 {stats.sourceBreakdown.local} locales • ☁️ {stats.sourceBreakdown.cloudinary} en la nube
              </span>
            </p>
          )} */}
        </div>

        {/* Controles y Filtros */}
        <div className="mb-8 flex flex-col items-center justify-center gap-4">
          {/* Toggle Vista Grid/Carrusel */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                viewMode === 'grid' ? 'shadow-lg' : ''
              }`}
              style={{
                borderColor: VIP_COLORS.oroAurora,
                color: viewMode === 'grid' ? 'white' : VIP_COLORS.rosaAurora,
                backgroundColor: viewMode === 'grid' ? VIP_COLORS.rosaAurora : 'transparent'
              }}
            >
              <Grid3X3 size={18} className="mr-2" />
              Vista Grid
            </button>
            
            <button
              onClick={() => setViewMode('carousel')}
              className={`flex items-center px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                viewMode === 'carousel' ? 'shadow-lg' : ''
              }`}
              style={{
                borderColor: VIP_COLORS.oroAurora,
                color: viewMode === 'carousel' ? 'white' : VIP_COLORS.rosaAurora,
                backgroundColor: viewMode === 'carousel' ? VIP_COLORS.rosaAurora : 'transparent'
              }}
            >
              <Play size={18} className="mr-2" />
              Vista Carrusel
            </button>
          </div>

          {/* Controles existentes */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Botón Refresh */}
            <button
              onClick={refresh}
              disabled={loading}
              className="flex items-center px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105"
              style={{
                borderColor: VIP_COLORS.oroAurora,
                color: VIP_COLORS.rosaAurora,
                backgroundColor: 'transparent'
              }}
            >
              <RefreshCw size={18} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>

            <Link
              href="/fotos"
              className="flex items-center px-4 py-2 border-2 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <Camera size={18} className="mr-2" />
              Subir Foto
            </Link>
            <Link
              href="/"
              className="flex items-center px-4 py-2 border-2 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <ImageIcon size={18} className="mr-2" />
              Ver Invitación
            </Link>

            {/* Toggle Filtros */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                display: 'none',
                background: `linear-gradient(135deg, ${VIP_COLORS.rosaAurora}, ${VIP_COLORS.rosaIntensa})`,
                color: 'white'
              }}
            >
              <Filter size={18} className="mr-2" />
              Filtros
            </button>
          </div>
        </div>

        {/* Panel de Filtros */}
        {showFilters && stats && (
          <div 
            className="mb-8 p-6 rounded-2xl border-2"
            style={{
              background: `linear-gradient(135deg, ${VIP_COLORS.cremaSuave} 0%, ${VIP_COLORS.blancoSeda} 100%)`,
              borderColor: `${VIP_COLORS.oroAurora}60`
            }}
          >
            <div className="grid md:grid-cols-3 gap-6">
              {/* Filtro por Momento */}
              <div>
                <label 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: VIP_COLORS.rosaAurora }}
                >
                  <Calendar size={16} className="inline mr-2" />
                  Momento del Evento
                </label>
                <select
                  value={filters.eventMoment}
                  onChange={(e) => setFilters({ eventMoment: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none"
                  style={{
                    borderColor: `${VIP_COLORS.oroAurora}60`,
                    backgroundColor: VIP_COLORS.cremaSuave
                  }}
                >
                  <option value="all">Todos los momentos</option>
                  {stats.eventMoments.map((moment: string) => (
                    <option key={moment} value={moment}>{moment}</option>
                  ))}
                </select>
              </div>

              {/* Filtro por Uploader */}
              <div>
                <label 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: VIP_COLORS.rosaAurora }}
                >
                  <Users size={16} className="inline mr-2" />
                  Subido por
                </label>
                <select
                  value={filters.uploader}
                  onChange={(e) => setFilters({ uploader: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none"
                  style={{
                    borderColor: `${VIP_COLORS.oroAurora}60`,
                    backgroundColor: VIP_COLORS.cremaSuave
                  }}
                >
                  <option value="all">Todos los invitados</option>
                  {stats.uploaders.map((uploader: string) => (
                    <option key={uploader} value={uploader}>{uploader}</option>
                  ))}
                </select>
              </div>

              {/* Filtro por Fuente */}
              <div>
                <label 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: VIP_COLORS.rosaAurora }}
                >
                  <Server size={16} className="inline mr-2" />
                  Fuente de Almacenamiento
                </label>
                <select
                  value={filters.source}
                  onChange={(e) => setFilters({ source: e.target.value as 'all' | 'local' | 'cloudinary' })}
                  className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none"
                  style={{
                    borderColor: `${VIP_COLORS.oroAurora}60`,
                    backgroundColor: VIP_COLORS.cremaSuave
                  }}
                >
                  <option value="all">Todas las fuentes</option>
                  <option value="local">📁 Servidor Local ({stats.sourceBreakdown.local})</option>
                  <option value="cloudinary">☁️ Cloudinary ({stats.sourceBreakdown.cloudinary})</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* 🆕 PAGINACIÓN SUPERIOR - Siempre visible antes de las fotos */}
        {pagination && (
          <div className="flex flex-col items-center space-y-4 mb-8">
            {/* Información de página */}
            <div 
              className="px-4 py-2 rounded-lg text-center"
              style={{
                background: `linear-gradient(135deg, ${VIP_COLORS.cremaSuave}, ${VIP_COLORS.blancoSeda})`,
                color: VIP_COLORS.rosaIntensa
              }}
            >
              <p className="text-sm font-medium">
                📸 Página {pagination.page} de {pagination.pages}
              </p>
              <p className="text-xs opacity-75">
                {pagination.total} foto{pagination.total !== 1 ? 's' : ''} en total
                {pagination.pages > 1 && (
                  <span className="ml-2">• {50 * (pagination.page - 1) + 1}-{Math.min(50 * pagination.page, pagination.total)} mostradas</span>
                )}
              </p>
            </div>

            {/* Controles de navegación - Solo si hay más de 1 página */}
            {pagination.pages > 1 && (
              <div className="flex items-center justify-center space-x-2 flex-wrap">
                {/* Primera página */}
                <button
                  onClick={() => {
                    console.log('🔍 Botón "Primera" página clickeado');
                    handleGoToPage(1);
                  }}
                  disabled={!pagination.hasPrev || loading}
                  className="flex items-center px-3 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  style={{
                    borderColor: VIP_COLORS.oroAurora,
                    color: VIP_COLORS.rosaAurora,
                    backgroundColor: 'transparent'
                  }}
                >
                  Primera
                </button>

                {/* Página anterior */}
                <button
                  onClick={() => {
                    console.log('🔍 Botón "Anterior" página clickeado');
                    handleGoToPage(pagination.page - 1);
                  }}
                  disabled={!pagination.hasPrev || loading}
                  className="flex items-center px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    borderColor: VIP_COLORS.oroAurora,
                    color: VIP_COLORS.rosaAurora,
                    backgroundColor: 'transparent'
                  }}
                >
                  <ChevronLeft size={18} className="mr-1" />
                  Anterior
                </button>

                {/* Indicador de página actual */}
                <div 
                  className="px-4 py-2 rounded-lg font-semibold min-w-[80px] text-center"
                  style={{
                    background: `linear-gradient(135deg, ${VIP_COLORS.rosaAurora}, ${VIP_COLORS.rosaIntensa})`,
                    color: 'white'
                  }}
                >
                  {pagination.page} / {pagination.pages}
                </div>

                {/* Página siguiente */}
                <button
                  onClick={() => {
                    console.log('🔍 Botón "Siguiente" página clickeado');
                    handleGoToPage(pagination.page + 1);
                  }}
                  disabled={!pagination.hasNext || loading}
                  className="flex items-center px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    borderColor: VIP_COLORS.oroAurora,
                    color: VIP_COLORS.rosaAurora,
                    backgroundColor: 'transparent'
                  }}
                >
                  Siguiente
                  <ChevronRight size={18} className="ml-1" />
                </button>

                {/* Última página */}
                <button
                  onClick={() => {
                    console.log('🔍 Botón "Última" página clickeado');
                    handleGoToPage(pagination.pages);
                  }}
                  disabled={!pagination.hasNext || loading}
                  className="flex items-center px-3 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  style={{
                    borderColor: VIP_COLORS.oroAurora,
                    color: VIP_COLORS.rosaAurora,
                    backgroundColor: 'transparent'
                  }}
                >
                  Última
                </button>
              </div>
            )}

            {/* Navegación rápida (solo en desktop y si hay múltiples páginas) */}
            {pagination.pages > 1 && (
              <div className="hidden md:flex items-center space-x-2">
                <span 
                  className="text-sm font-medium"
                  style={{ color: VIP_COLORS.rosaIntensa }}
                >
                  Ir a página:
                </span>
                <input
                  type="number"
                  min="1"
                  max={pagination.pages}
                  value={pagination.page}
                  onChange={(e) => {
                    const pageNum = parseInt(e.target.value);
                    if (pageNum >= 1 && pageNum <= pagination.pages) {
                      goToPage(pageNum);
                    }
                  }}
                  disabled={loading}
                  className="w-16 px-2 py-1 text-center border-2 rounded-lg transition-colors duration-200 focus:outline-none disabled:opacity-50"
                  style={{
                    borderColor: `${VIP_COLORS.oroAurora}60`,
                    backgroundColor: VIP_COLORS.cremaSuave,
                    color: VIP_COLORS.rosaIntensa
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Estado de carga */}
        {loading && (
          <div className="text-center py-12">
            <Loader2 size={48} className="animate-spin mx-auto mb-4 vip-pulse-aurora" style={{ color: VIP_COLORS.rosaAurora }} />
            <p style={{ color: VIP_COLORS.rosaIntensa }}>Cargando fotos...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div 
            className="p-4 rounded-lg border-l-4 mb-6"
            style={{
              backgroundColor: `${VIP_COLORS.lavandaAurora}10`,
              borderColor: VIP_COLORS.lavandaAurora
            }}
          >
            <div className="flex items-center">
              <AlertCircle size={20} style={{ color: VIP_COLORS.lavandaAurora }} className="mr-2" />
              <p style={{ color: VIP_COLORS.lavandaAurora }}>{error}</p>
            </div>
          </div>
        )}

        {/* Error de eliminación */}
        {deleteError && (
          <div 
            className="p-4 rounded-lg border-l-4 mb-6"
            style={{
              backgroundColor: `${VIP_COLORS.lavandaAurora}10`,
              borderColor: VIP_COLORS.lavandaAurora
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Trash2 size={20} style={{ color: VIP_COLORS.lavandaAurora }} className="mr-2" />
                <p style={{ color: VIP_COLORS.lavandaAurora }}>Error al eliminar: {deleteError}</p>
              </div>
              <button
                onClick={clearDeleteError}
                className="text-sm underline hover:no-underline"
                style={{ color: VIP_COLORS.lavandaAurora }}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Contenido Principal - Vista Condicional */}
        {viewMode === 'carousel' ? (
          /* Vista Carrusel */
          <PhotoCarouselView
            photos={photos}
            loading={loading}
            getPhotoDisplayUrl={getPhotoDisplayUrl}
            onPhotoSelect={setSelectedPhoto}
            onDeletePhoto={handleDeleteClick}
            isPhotoDeleting={isPhotoDeleting}
          />
        ) : (
          /* Vista Grid Original */
          <>
            {/* Grid de Fotos */}
            {!loading && photos.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {photos.map((photo: HybridPhoto) => (
                  <div 
                    key={photo.id}
                    className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                    onClick={() => setSelectedPhoto(photo)}
                    style={{ aspectRatio: '1' }}
                  >
                    {/* Imagen usando URL híbrida */}
                    <Image
                      src={getPhotoDisplayUrl(photo, 'compressed')}
                      alt={photo.originalName}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover"
                      loading="lazy"
                    />
                    
                    {/* Indicador de fuente */}
                    <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {photo.source === 'cloudinary' ? (
                        <Cloud size={16} className="text-blue-500 bg-white rounded-full p-1" />
                      ) : (
                        <Server size={16} className="text-green-500 bg-white rounded-full p-1" />
                      )}
                    </div>
                    
                    {/* 🗑️ Botón de eliminación */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {isPhotoDeleting(photo.id) ? (
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                        >
                          <Loader2 size={16} className="animate-spin" style={{ color: VIP_COLORS.lavandaAurora }} />
                        </div>
                      ) : (
                        <button
                          onClick={(e) => handleDeleteClick(photo, e)}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                          style={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            color: VIP_COLORS.lavandaAurora
                          }}
                          aria-label={`Eliminar foto ${photo.originalName}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="font-semibold text-sm truncate">{photo.uploaderName}</p>
                      <p className="text-xs opacity-75">{photo.eventMoment}</p>
                      <p className="text-xs opacity-75">{formatDate(photo.uploadedAt)}</p>
                    </div>

                    {/* Icono de love en la esquina */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Heart size={20} style={{ color: VIP_COLORS.rosaAurora }} fill="white" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/** Regresar al hasta arriba */}
        <div className="flex justify-center mb-6">
          <Link
            href="#top"
            className="inline-flex items-center px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105"
            style={{
              borderColor: VIP_COLORS.oroAurora,
              color: VIP_COLORS.rosaAurora,
              backgroundColor: 'transparent'
            }}
          >
            <ArrowUp size={18} className="mr-1" />
            Volver Arriba
          </Link>
        </div>

        {/* 📄 PAGINACIÓN INFERIOR - Duplicada para navegación post-visualización */}
        {pagination && pagination.pages > 1 && (
          <div className="flex flex-col items-center space-y-4 mb-8 pt-6 border-t-2" style={{ borderColor: `${VIP_COLORS.oroAurora}30` }}>
            {/* Título de sección */}
            <div 
              className="px-4 py-2 rounded-lg text-center"
              style={{
                background: `linear-gradient(135deg, ${VIP_COLORS.oroAurora}20, ${VIP_COLORS.rosaAurora}20)`,
                color: VIP_COLORS.rosaIntensa
              }}
            >
              <p className="text-sm font-medium">
                🔄 Navegación de Páginas
              </p>
            </div>

            {/* Información de página */}
            <div 
              className="px-4 py-2 rounded-lg text-center"
              style={{
                background: `linear-gradient(135deg, ${VIP_COLORS.cremaSuave}, ${VIP_COLORS.blancoSeda})`,
                color: VIP_COLORS.rosaIntensa
              }}
            >
              <p className="text-sm font-medium">
                📸 Página {pagination.page} de {pagination.pages}
              </p>
              <p className="text-xs opacity-75">
                {pagination.total} foto{pagination.total !== 1 ? 's' : ''} en total
                <span className="ml-2">• {50 * (pagination.page - 1) + 1}-{Math.min(50 * pagination.page, pagination.total)} mostradas</span>
              </p>
            </div>

            {/* Controles de navegación */}
            <div className="flex items-center justify-center space-x-2 flex-wrap">
              {/* Primera página */}
              <button
                onClick={() => {
                  console.log('🔍 Botón "Primera" (inferior) página clickeado');
                  handleGoToPage(1);
                }}
                disabled={!pagination.hasPrev || loading}
                className="flex items-center px-3 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                style={{
                  borderColor: VIP_COLORS.oroAurora,
                  color: VIP_COLORS.rosaAurora,
                  backgroundColor: 'transparent'
                }}
              >
                Primera
              </button>

              {/* Página anterior */}
              <button
                onClick={() => {
                  console.log('🔍 Botón "Anterior" (inferior) página clickeado');
                  handleGoToPage(pagination.page - 1);
                }}
                disabled={!pagination.hasPrev || loading}
                className="flex items-center px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  borderColor: VIP_COLORS.oroAurora,
                  color: VIP_COLORS.rosaAurora,
                  backgroundColor: 'transparent'
                }}
              >
                <ChevronLeft size={18} className="mr-1" />
                Anterior
              </button>

              {/* Indicador de página actual */}
              <div 
                className="px-4 py-2 rounded-lg font-semibold min-w-[80px] text-center"
                style={{
                  background: `linear-gradient(135deg, ${VIP_COLORS.rosaAurora}, ${VIP_COLORS.rosaIntensa})`,
                  color: 'white'
                }}
              >
                {pagination.page} / {pagination.pages}
              </div>

              {/* Página siguiente */}
              <button
                onClick={() => {
                  console.log('🔍 Botón "Siguiente" (inferior) página clickeado');
                  handleGoToPage(pagination.page + 1);
                }}
                disabled={!pagination.hasNext || loading}
                className="flex items-center px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  borderColor: VIP_COLORS.oroAurora,
                  color: VIP_COLORS.rosaAurora,
                  backgroundColor: 'transparent'
                }}
              >
                Siguiente
                <ChevronRight size={18} className="ml-1" />
              </button>

              {/* Última página */}
              <button
                onClick={() => {
                  console.log('🔍 Botón "Última" (inferior) página clickeado');
                  handleGoToPage(pagination.pages);
                }}
                disabled={!pagination.hasNext || loading}
                className="flex items-center px-3 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                style={{
                  borderColor: VIP_COLORS.oroAurora,
                  color: VIP_COLORS.rosaAurora,
                  backgroundColor: 'transparent'
                }}
              >
                Última
              </button>
            </div>

            {/* Navegación rápida (solo en desktop) */}
            <div className="hidden md:flex items-center space-x-2">
              <span 
                className="text-sm font-medium"
                style={{ color: VIP_COLORS.rosaIntensa }}
              >
                Ir a página:
              </span>
              <input
                type="number"
                min="1"
                max={pagination.pages}
                value={pagination.page}
                onChange={(e) => {
                  const pageNum = parseInt(e.target.value);
                  if (pageNum >= 1 && pageNum <= pagination.pages) {
                    goToPage(pageNum);
                  }
                }}
                disabled={loading}
                className="w-16 px-2 py-1 text-center border-2 rounded-lg transition-colors duration-200 focus:outline-none disabled:opacity-50"
                style={{
                  borderColor: `${VIP_COLORS.oroAurora}60`,
                  backgroundColor: VIP_COLORS.cremaSuave,
                  color: VIP_COLORS.rosaIntensa
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Modal de Foto Ampliada */}
      <PhotoDetailModal
        photo={selectedPhoto}
        isOpen={!!selectedPhoto}
        currentIndex={selectedPhoto ? photos.findIndex((p: HybridPhoto) => p.id === selectedPhoto.id) : -1}
        onClose={() => setSelectedPhoto(null)}
        onDeletePhoto={handleDeleteClick}
        getPhotoDisplayUrl={getPhotoDisplayUrl}
        isPhotoDeleting={isPhotoDeleting}
      />

      {/* 🗑️ Modal de Confirmación de Eliminación */}
      <DeleteConfirmationModal
        photo={photoToDelete}
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        isDeleting={photoToDelete ? isPhotoDeleting(photoToDelete.id) : false}
      />
    </section>
  );
};

export default DinamicGallery;