import { useState } from 'react';
import { Share2, Twitter, Facebook, Download, CheckCircle } from 'lucide-react';
import './ShareButton.css';

function ShareButton({ type, data }) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateShareText = () => {
    if (type === 'workout') {
      return `💪 Just completed a ${data.duration}-minute ${data.exercise}! Burned ${data.calories} calories at intensity ${data.intensity}/10. #FitnessTracker #Workout`;
    } else if (type === 'goal') {
      const progress = Math.round((data.currentValue / data.targetValue) * 100);
      return `🎯 ${progress}% complete on my goal: "${data.title}"! ${data.currentValue}/${data.targetValue} ${data.type}. #FitnessGoals #Progress`;
    } else if (type === 'achievement') {
      return `🏆 Achievement Unlocked: ${data.title}! ${data.description} #FitnessTracker #Achievement`;
    }
    return '';
  };

  const generateShareImage = () => {
    // Create a canvas to generate shareable image
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, '#1a0033');
    gradient.addColorStop(1, '#0a0a1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Add neon border
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 10;
    ctx.strokeRect(10, 10, 1180, 610);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    
    if (type === 'workout') {
      ctx.fillText('💪 Workout Complete!', 600, 150);
      ctx.font = 'bold 80px Arial';
      ctx.fillStyle = '#00ffff';
      ctx.fillText(data.exercise, 600, 280);
      
      ctx.font = '50px Arial';
      ctx.fillStyle = '#ff00ff';
      ctx.fillText(`${data.duration} min • ${data.calories} cal • Intensity ${data.intensity}/10`, 600, 380);
    } else if (type === 'goal') {
      const progress = Math.round((data.currentValue / data.targetValue) * 100);
      ctx.fillText('🎯 Goal Progress', 600, 150);
      ctx.font = 'bold 70px Arial';
      ctx.fillStyle = '#00ffff';
      ctx.fillText(data.title, 600, 280);
      
      ctx.font = 'bold 100px Arial';
      ctx.fillStyle = '#00ff80';
      ctx.fillText(`${progress}%`, 600, 420);
      
      ctx.font = '40px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${data.currentValue} / ${data.targetValue} ${data.type}`, 600, 480);
    }

    // Footer
    ctx.font = '40px Arial';
    ctx.fillStyle = '#00ffff';
    ctx.fillText('FITTRACK - Fitness Tracker', 600, 570);

    return canvas.toDataURL('image/png');
  };

  const handleShare = async (platform) => {
    const shareText = generateShareText();
    const shareUrl = window.location.href;

    if (platform === 'twitter') {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(url, '_blank', 'width=600,height=400');
    } else if (platform === 'facebook') {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank', 'width=600,height=400');
    } else if (platform === 'native') {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'My Fitness Progress',
            text: shareText,
            url: shareUrl
          });
        } catch (err) {
          console.log('Share cancelled');
        }
      } else {
        // Fallback to copy to clipboard
        navigator.clipboard.writeText(shareText + ' ' + shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else if (platform === 'download') {
      const imageData = generateShareImage();
      const link = document.createElement('a');
      link.href = imageData;
      link.download = `fitness-${type}-${Date.now()}.png`;
      link.click();
    }

    setShowMenu(false);
  };

  return (
    <div className="share-button-container">
      <button 
        className="share-trigger"
        onClick={() => setShowMenu(!showMenu)}
        title="Share"
      >
        <Share2 size={20} />
        Share
      </button>

      {showMenu && (
        <>
          <div className="share-overlay" onClick={() => setShowMenu(false)} />
          <div className="share-menu">
            <button onClick={() => handleShare('native')} className="share-option">
              {copied ? <CheckCircle size={20} /> : <Share2 size={20} />}
              <span>{copied ? 'Copied!' : 'Share...'}</span>
            </button>

            <button onClick={() => handleShare('twitter')} className="share-option twitter">
              <Twitter size={20} />
              <span>Twitter</span>
            </button>

            <button onClick={() => handleShare('facebook')} className="share-option facebook">
              <Facebook size={20} />
              <span>Facebook</span>
            </button>

            <button onClick={() => handleShare('download')} className="share-option download">
              <Download size={20} />
              <span>Download Image</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ShareButton;
