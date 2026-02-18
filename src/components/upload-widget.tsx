import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '@/constants'
import { UploadWidgetProps, UploadWidgetValue } from '@/types'
import { UploadCloud } from 'lucide-react'
import {useState, useEffect, useRef} from 'react'

export const UploadWidget = ({value=null, onChange, disabled=false}: UploadWidgetProps) => {
  const [preview, setPreview] = useState<UploadWidgetValue | null>(value) // Determine showing upload dropzone or the image preview
  const onChangeRef = useRef(onChange)

  const cloudinaryRef = useRef<CloudinaryWidget | null>(null)

  // open widget func
  const openWidget = ()=>{
    if(!disabled) cloudinaryRef.current?.open()
  }
  
  useEffect(()=>{
    setPreview(value)
  }, [value])

  useEffect(()=>{
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(()=>{
    if( typeof window === 'undefined') return;

    const intializeWidget = () => {
      if(!window.cloudinary || cloudinaryRef.current) return false

      cloudinaryRef.current = window.cloudinary.createUploadWidget({
        cloudName: CLOUDINARY_CLOUD_NAME,
        uploadPreset: CLOUDINARY_UPLOAD_PRESET,
        clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
        multiple: false, 
        cropping: true,
        folder: 'uploads',
        maxFileSize: 5000000

      }, (error, result)=>{
        if(!error && result.event === 'success'){
          const payload: UploadWidgetValue = {
            url: result.info.secure_url,
            publicId: result.info.public_id
          }

          setPreview(payload)
          onChangeRef.current?.(payload)
        }
      })

      return true
    }

    if(intializeWidget()) return

    const intervalId = window.setInterval(()=>{
      if(intializeWidget()){
        window.clearInterval(intervalId)
      }
    }, 500)

    return () => window.clearInterval(intervalId)

  }, [])

  return (
    <div className='space-y-2'>
      {
        preview ? <div className='upload-preview'>
          <img src={preview.url} alt='Upload image'/>
        </div>
        : <div className='upload-dropzone' role='button' onClick={openWidget} tabIndex={0}>
            <div className='upload-prompt'>
            <UploadCloud className='icon'/>
            <div>
              <p>Click to upload photo</p>
              <p>PNG, JPG UP TO 5MB</p>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default UploadWidget