import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Upload, Image, X, CheckCircle, AlertCircle, Camera, Lightbulb, Eye, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface PhotoFile {
  id: string;
  file: File;
  preview: string;
  quality: {
    lighting: 'good' | 'fair' | 'poor';
    blur: 'sharp' | 'slight' | 'blurry';
    angle: 'good' | 'fair' | 'poor';
    overall: 'excellent' | 'good' | 'needs-improvement';
  };
}

const BecomeHostStep3 = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDescriptionHelper, setShowDescriptionHelper] = useState(false);

  // Load previous step data
  useEffect(() => {
    const step1Data = sessionStorage.getItem('hostListingStep1');
    const step2Data = sessionStorage.getItem('hostListingStep2');
    
    if (!step1Data || !step2Data) {
      navigate('/become-host/listing/step1');
      return;
    }

    // Pre-populate title based on property info
    const data = JSON.parse(step1Data);
    const suggestedTitle = `Beautiful ${data.propertyType} in ${data.location}`;
    setTitle(suggestedTitle);
  }, [navigate]);

  // Mock photo quality analysis
  const analyzePhotoQuality = (file: File): PhotoFile['quality'] => {
    // In a real app, this would use AI/ML to analyze the image
    // For demo purposes, we'll simulate random quality scores
    const qualities = ['good', 'fair', 'poor'] as const;
    const sharpness = ['sharp', 'slight', 'blurry'] as const;
    
    const lighting = qualities[Math.floor(Math.random() * qualities.length)];
    const blur = sharpness[Math.floor(Math.random() * sharpness.length)];
    const angle = qualities[Math.floor(Math.random() * qualities.length)];
    
    let overall: PhotoFile['quality']['overall'] = 'needs-improvement';
    if (lighting === 'good' && blur === 'sharp' && angle === 'good') {
      overall = 'excellent';
    } else if ((lighting === 'good' || lighting === 'fair') && blur !== 'blurry') {
      overall = 'good';
    }
    
    return { lighting, blur, angle, overall };
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const id = Math.random().toString(36).substr(2, 9);
        const preview = URL.createObjectURL(file);
        const quality = analyzePhotoQuality(file);
        
        setPhotos(prev => [...prev, { id, file, preview, quality }]);
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removePhoto = (id: string) => {
    setPhotos(prev => {
      const photo = prev.find(p => p.id === id);
      if (photo) {
        URL.revokeObjectURL(photo.preview);
      }
      return prev.filter(p => p.id !== id);
    });
  };

  const reorderPhotos = (fromIndex: number, toIndex: number) => {
    setPhotos(prev => {
      const newPhotos = [...prev];
      const [removed] = newPhotos.splice(fromIndex, 1);
      newPhotos.splice(toIndex, 0, removed);
      return newPhotos;
    });
  };

  const getQualityIcon = (quality: PhotoFile['quality']['overall']) => {
    switch (quality) {
      case 'excellent':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'good':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getQualityColor = (quality: PhotoFile['quality']['overall']) => {
    switch (quality) {
      case 'excellent':
        return 'bg-green-50 border-green-200';
      case 'good':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  const descriptionPrompts = [
    "What makes your space unique?",
    "Describe the neighborhood and nearby attractions",
    "Mention any special features or recent renovations",
    "What type of guests would love this space?",
    "Include practical details like check-in process"
  ];

  const enhanceDescription = () => {
    const step1Data = JSON.parse(sessionStorage.getItem('hostListingStep1') || '{}');
    const step2Data = JSON.parse(sessionStorage.getItem('hostListingStep2') || '{}');
    
    let enhanced = description;
    
    // Add location-specific keywords
    if (step1Data.location?.toLowerCase().includes('nairobi')) {
      enhanced += enhanced ? '\n\n' : '';
      enhanced += "Located in the heart of Kenya's vibrant capital, you'll be close to business districts, shopping centers, and cultural attractions.";
    }
    
    // Add amenity highlights
    if (step2Data.amenities?.includes('pool')) {
      enhanced += enhanced ? '\n\n' : '';
      enhanced += "Relax and unwind in our refreshing swimming pool after a day of exploring.";
    }
    
    if (step2Data.amenities?.includes('wifi')) {
      enhanced += enhanced ? '\n\n' : '';
      enhanced += "Stay connected with high-speed WiFi, perfect for remote work or sharing your travel memories.";
    }
    
    setDescription(enhanced);
    setShowDescriptionHelper(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (photos.length < 3) {
      alert('Please upload at least 3 photos');
      return;
    }
    
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description');
      return;
    }
    
    // Save data to session storage
    sessionStorage.setItem('hostListingStep3', JSON.stringify({
      photos: photos.map(p => ({ id: p.id, quality: p.quality })),
      title: title.trim(),
      description: description.trim()
    }));
    
    // Navigate to step 4
    navigate('/become-host/listing/step4');
  };

  const isFormValid = photos.length >= 3 && title.trim() && description.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/become-host/listing/step2" className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
          <div className="text-sm text-gray-600">
            Step 3 of 5: Photos & Description
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="container mx-auto px-6 mb-8">
        <Progress value={60} className="h-2" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Show off your space
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Great photos and descriptions help guests imagine staying at your place
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Photo Upload */}
                <div>
                  <Label className="text-base font-semibold text-gray-900 mb-4 block">
                    Photos *
                  </Label>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload at least 3 high-quality photos. The first photo will be your cover image.
                  </p>
                  
                  {/* Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragOver 
                        ? 'border-orange-400 bg-orange-50' 
                        : 'border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Drag photos here, or click to browse
                    </h3>
                    <p className="text-gray-600">
                      JPG, PNG up to 10MB each
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileSelect(e.target.files)}
                    />
                  </div>

                  {/* Photo Grid */}
                  {photos.length > 0 && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">
                          Uploaded Photos ({photos.length})
                        </h4>
                        <div className="bg-orange-50 px-3 py-1 rounded-full">
                          <Camera className="h-4 w-4 inline text-orange-600 mr-1" />
                          <span className="text-sm text-orange-700">
                            Quality Checker Active
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {photos.map((photo, index) => (
                          <div
                            key={photo.id}
                            className={`relative rounded-lg border-2 overflow-hidden ${getQualityColor(photo.quality.overall)}`}
                          >
                            <img
                              src={photo.preview}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-48 object-cover"
                            />
                            
                            {/* Quality Badge */}
                            <div className="absolute top-2 left-2">
                              <Badge variant="secondary" className="bg-white/90 text-gray-700">
                                {getQualityIcon(photo.quality.overall)}
                                <span className="ml-1 capitalize">{photo.quality.overall}</span>
                              </Badge>
                            </div>
                            
                            {/* Cover Photo Badge */}
                            {index === 0 && (
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-orange-500 text-white">
                                  Cover Photo
                                </Badge>
                              </div>
                            )}
                            
                            {/* Remove Button */}
                            <button
                              type="button"
                              onClick={() => removePhoto(photo.id)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                              style={{ marginRight: index === 0 ? '80px' : '0' }}
                            >
                              <X className="h-4 w-4" />
                            </button>
                            
                            {/* Quality Details */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-xs">
                              <div className="flex justify-between">
                                <span>Lighting: {photo.quality.lighting}</span>
                                <span>Focus: {photo.quality.blur}</span>
                                <span>Angle: {photo.quality.angle}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Photo Tips */}
                      <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-start">
                          <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-blue-900 mb-1">Photo Tips</h5>
                            <ul className="text-sm text-blue-800 space-y-1">
                              <li>• Use natural lighting when possible</li>
                              <li>• Show different angles and rooms</li>
                              <li>• Keep photos sharp and well-composed</li>
                              <li>• Include outdoor spaces if available</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Title */}
                <div>
                  <Label htmlFor="title" className="text-base font-semibold text-gray-900 mb-2 block">
                    Listing Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Cozy apartment with city views in Nairobi"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={60}
                    required
                  />
                  <div className="flex justify-between mt-1">
                    <p className="text-sm text-gray-600">
                      Make it catchy and descriptive
                    </p>
                    <span className="text-sm text-gray-500">
                      {title.length}/60
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="description" className="text-base font-semibold text-gray-900">
                      Description *
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDescriptionHelper(!showDescriptionHelper)}
                      className="border-orange-300 text-orange-600 hover:bg-orange-50"
                    >
                      <Sparkles className="h-4 w-4 mr-1" />
                      Description Enhancer
                    </Button>
                  </div>
                  
                  {showDescriptionHelper && (
                    <div className="mb-4 bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <h5 className="font-medium text-orange-900 mb-2">Writing Prompts:</h5>
                      <ul className="text-sm text-orange-800 space-y-1 mb-3">
                        {descriptionPrompts.map((prompt, index) => (
                          <li key={index}>• {prompt}</li>
                        ))}
                      </ul>
                      <Button
                        type="button"
                        onClick={enhanceDescription}
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Enhance My Description
                      </Button>
                    </div>
                  )}
                  
                  <Textarea
                    id="description"
                    placeholder="Describe your space, neighborhood, and what makes it special..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    maxLength={1000}
                    required
                  />
                  <div className="flex justify-between mt-1">
                    <p className="text-sm text-gray-600">
                      Help guests understand what makes your place unique
                    </p>
                    <span className="text-sm text-gray-500">
                      {description.length}/1000
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Save & Continue
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BecomeHostStep3;