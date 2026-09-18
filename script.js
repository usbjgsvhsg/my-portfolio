// دالة لإنشاء وإضافة زر المشاركة برمجياً بعد ظهور النتيجة
function addShareButton() {
    // تأكد أن الزر غير موجود مسبقاً حتى ما يتكرر
    if (document.getElementById('share-btn')) return;

    // إنشاء عنصر الزر
    const shareBtn = document.createElement('button');
    shareBtn.id = 'share-btn';
    shareBtn.innerText = '📤 مشاركة النتيجة';

    // تنسيق الزر برمجياً ليتطابق مع تصميم الموقع الحالي
    shareBtn.style.width = '100%';
    shareBtn.style.marginTop = '15px';
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

    // حدث الضغط على زر المشاركة
    shareBtn.onclick = async () => {
        const shareData = {
           title: 'AI Image Authenticator Result',
           text: 'تم فحص الصورة بنجاح عبر نظام Neural Core. تحقق من النتيجة!',
           url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // نسخ الرابط كبديل إذا لم تكن ميزة المشاركة مدعومة
                await navigator.clipboard.writeText(window.location.href);
                alert('تم نسخ رابط النتيجة إلى الحافظة!');
            }
        } catch (err) {
            console.log('خطأ في المشاركة:', err);
        }
    };

    // إيجاد مكان مناسب لإدراج الزر (مثلاً بعد زر الفحص الأخير)
    const container = document.querySelector('.container') || document.body;
    container.appendChild(shareBtn);
}

// استدعاء الدالة عند اكتمال التحليل أو ظهور النتائج
// (يمكنك ربطها بدالة عرض النتائج الأصلية لديك)
console.log("Share Feature Script Loaded Safely");

