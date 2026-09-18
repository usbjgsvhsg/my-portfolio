// دالة لإضافة زر المشاركة تحت زر "فحص صورة أخرى" بدقة
function addShareButton() {
    // إذا كان الزر موجوداً مسبقاً، فلا داعي لتكراره
    if (document.getElementById('share-result-btn')) return;

    // نبحث عن زر "فحص صورة أخرى" الموجود في واجهة النتائج
    const buttons = document.querySelectorAll('button, .upload-box, div');
    let targetElement = null;

    for (let el of buttons) {
        if (el.innerText && el.innerText.includes('فحص صورة أخرى')) {
            targetElement = el;
            break;
        }
    }

    // إنشاء زر المشاركة بتصميم متناسق مع الموقع
    const shareBtn = document.createElement('button');
    shareBtn.id = 'share-result-btn';
    shareBtn.innerText = '📤 مشاركة النتيجة';

    shareBtn.style.width = '100%';
    shareBtn.style.marginTop = '12px';
    shareBtn.style.padding = '12px';
    shareBtn.style.backgroundColor = '#38bdf8';
    shareBtn.style.color = '#0b0f19';
    shareBtn.style.border = 'none';
    shareBtn.style.borderRadius = '8px';
    shareBtn.style.fontWeight = 'bold';
    shareBtn.style.cursor = 'pointer';
    shareBtn.style.transition = 'background 0.3s ease';

    shareBtn.onmouseover = () => shareBtn.style.backgroundColor = '#7dd3fc';
    shareBtn.onmouseout = () => shareBtn.style.backgroundColor = '#38bdf8';

    // تفعيل عملية المشاركة أو النسخ عند الضغط
    shareBtn.onclick = async () => {
        const shareData = {
            title: 'AI Image Authenticator Result',
            text: 'تم فحص الصورة بنجاح عبر نظام Neural Core. تحقق من تفاصيل التحليل!',
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('تم نسخ رابط النتيجة إلى الحافظة بنجاح!');
            }
        } catch (err) {
            console.log('خطأ في المشاركة:', err);
        }
    };

    // إدراج زر المشاركة مباشرة تحت زر إعادة الفحص أو في نهاية الحاوية
    if (targetElement && targetElement.parentNode) {
        targetElement.parentNode.insertBefore(shareBtn, targetElement.nextSibling);
    } else {
        const container = document.querySelector('.container') || document.body;
        container.appendChild(shareBtn);
    }
}

// تشغيل الدالة تلقائياً عند ظهور شاشة النتائج
setTimeout(addShareButton, 1000);
console.log("Share Button Script Updated Successfully");

