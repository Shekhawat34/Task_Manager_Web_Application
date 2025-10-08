# Complete Task Manager Setup Guide

## 📁 Complete File Structure

```
TaskManager/
│
├── static/
│   ├── css/
│   │   └── style.css                 # Custom CSS styles
│   ├── js/
│   │   └── script.js                 # jQuery and JavaScript code
│   └── images/
│       ├── task-icon.png             # Navbar icon (30x30px)
│       ├── empty-tasks.png           # Empty state image (150x150px)
│       └── success-icon.png          # Success page icon (100x100px)
│
├── templates/
│   ├── index.html                    # Main task list page
│   └── success.html                  # Success confirmation page
│
├── app.py                            # Flask main application file
├── requirements.txt                  # Python dependencies
└── README.md                         # Project documentation
```

## 🚀 Step-by-Step Setup Instructions

### Step 1: Create Project Directory Structure

Open your terminal/command prompt and run:

```bash
# Create main project directory
mkdir TaskManager
cd TaskManager

# Create subdirectories
mkdir static
mkdir static/css
mkdir static/js
mkdir static/images
mkdir templates
```

### Step 2: Create All Files

Create each file in its respective location:

#### 1. **app.py** (Root directory)
```bash
# Create the file
touch app.py  # On Windows use: type nul > app.py
```
Copy the Flask code provided in the first artifact.

#### 2. **requirements.txt** (Root directory)
```bash
touch requirements.txt  # On Windows use: type nul > requirements.txt
```
Copy the dependencies list provided.

#### 3. **templates/index.html**
```bash
touch templates/index.html  # On Windows use: type nul > templates/index.html
```
Copy the HTML code for the main page.

#### 4. **templates/success.html**
```bash
touch templates/success.html  # On Windows use: type nul > templates/success.html
```
Copy the HTML code for the success page.

#### 5. **static/css/style.css**
```bash
touch static/css/style.css  # On Windows use: type nul > static/css/style.css
```
Copy the CSS code provided.

#### 6. **static/js/script.js**
```bash
touch static/js/script.js  # On Windows use: type nul > static/js/script.js
```
Copy the JavaScript code provided.

### Step 3: Add Images

You need to add 3 images to `static/images/` directory:

**Option A: Download Free Icons**
- Visit [Flaticon.com](https://www.flaticon.com) or [Icons8.com](https://icons8.com)
- Search and download:
  - "task icon" → Save as `task-icon.png` (30x30px)
  - "empty box" or "no data" → Save as `empty-tasks.png` (150x150px)
  - "checkmark" or "success" → Save as `success-icon.png` (100x100px)

**Option B: Create Simple Placeholder Images**
- Use any image editing software
- Create colored squares with the required dimensions
- Or temporarily use any PNG images you have

**Option C: Use Online Image Placeholders**
Modify the HTML temporarily to use placeholder services:
```html
<!-- In index.html and success.html, replace image paths with: -->
<img src="https://via.placeholder.com/30/0d6efd/ffffff?text=T" alt="Task Icon">
<img src="https://via.placeholder.com/150/cccccc/666666?text=No+Tasks" alt="No tasks">
<img src="https://via.placeholder.com/100/28a745/ffffff?text=✓" alt="Success">
```

### Step 4: Install Python Dependencies

```bash
# Make sure you're in the TaskManager directory
cd TaskManager

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 5: Run the Application

```bash
# Make sure virtual environment is activated
python app.py
```

You should see output like:
```
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
```

### Step 6: Access the Application

Open your web browser and navigate to:
```
http://127.0.0.1:5000/
```
or
```
http://localhost:5000/
```

## 🎯 Testing the Application

### Test Scenario 1: Add a Task
1. On the home page, fill in the "Add New Task" form:
   - Task Title: "Complete project documentation"
   - Description: "Write comprehensive README file"
   - Priority: High
2. Click "Add Task"
3. You should be redirected to the success page
4. After 5 seconds (or click the button), return to home page
5. Verify the task appears in the task list

### Test Scenario 2: Complete a Task
1. Click the green ✓ button on any task
2. The task should show as "Completed" with strikethrough text
3. The task should have a green background

### Test Scenario 3: Delete a Task
1. Click the red ✕ button on any task
2. Confirm the deletion in the popup
3. The task should be removed from the list

### Test Scenario 4: Form Validation
1. Try to submit the form without a task title
2. You should see a validation error
3. Enter a title and submit successfully

## 🔧 Common Issues and Solutions

### Issue 1: "Module not found" error
**Solution:**
```bash
# Ensure virtual environment is activated
# Reinstall dependencies
pip install --upgrade -r requirements.txt
```

### Issue 2: Flask app not starting
**Solution:**
```bash
# Check if port 5000 is available
# Try a different port
python app.py --port 5001
```

Or modify `app.py`:
```python
if __name__ == '__main__':
    app.run(debug=True, port=5001)
```

### Issue 3: Images not loading
**Solution:**
- Check file names match exactly (case-sensitive)
- Verify images are in `static/images/` directory
- Check browser console for 404 errors
- Clear browser cache (Ctrl+Shift+R)

### Issue 4: CSS/JS not loading
**Solution:**
- Verify file paths are correct
- Check Flask is serving static files
- Clear browser cache
- Open browser DevTools (F12) and check Network tab

### Issue 5: Tasks disappear after refresh
**Note:** This is expected behavior! Tasks are stored in memory and will be lost when:
- Server restarts
- Browser closes
- Application reloads

To persist data, you would need to add a database (future enhancement).

## 📝 Quick Start Commands

```bash
# Complete setup in one go (after creating all files)
cd TaskManager
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## 🎨 Customization Ideas

### 1. Change Theme Colors
Edit `static/css/style.css`:
```css
/* Change background gradient */
body {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
}

/* Change navbar color */
.navbar {
    background: #1e3c72 !important;
}
```

### 2. Add More Priority Levels
Edit `templates/index.html`:
```html
<select class="form-select" id="task_priority" name="task_priority">
    <option value="Critical">Critical</option>
    <option value="High">High</option>
    <option value="Medium" selected>Medium</option>
    <option value="Low">Low</option>
</select>
```

### 3. Modify Auto-redirect Time
Edit `static/js/script.js`:
```javascript
// Change from 5 seconds to 10 seconds
let countdown = 10;
```

## 📊 Application Flow Diagram

```
User Access → Home Page (/)
                ↓
        View All Tasks
                ↓
        Fill Add Task Form
                ↓
        Click "Add Task"
                ↓
        POST to /submit
                ↓
        Redirect to /success/<task_id>
                ↓
        View Success Message
                ↓
        Auto-redirect to / (after 5s)
                ↓
        Back to Home Page
```

## 🔒 Security Notes

**Current Implementation:**
- No authentication
- No input sanitization
- Debug mode enabled
- No CSRF protection

**For Production Use:**
- Add Flask-WTF for CSRF protection
- Implement user authentication
- Disable debug mode
- Add input validation and sanitization
- Use environment variables for configuration
- Add database with proper ORM (SQLAlchemy)

## 📚 Learning Resources

- **Flask Documentation:** https://flask.palletsprojects.com/
- **Bootstrap Documentation:** https://getbootstrap.com/docs/
- **jQuery Documentation:** https://api.jquery.com/
- **Jinja2 Documentation:** https://jinja.palletsprojects.com/

## ✅ Verification Checklist

Before running, ensure:
- [ ] All 7 files are created in correct locations
- [ ] requirements.txt contains all dependencies
- [ ] Virtual environment is created and activated
- [ ] Dependencies are installed via pip
- [ ] Images are added to static/images/ directory
- [ ] No typos in file names or paths
- [ ] Python 3.8+ is installed
- [ ] Port 5000 is available

## 🎓 What You've Learned

By completing this project, you've worked with:
- ✅ Flask routing and request handling
- ✅ Jinja2 template engine
- ✅ Bootstrap responsive design
- ✅ jQuery DOM manipulation
- ✅ JavaScript event handling
- ✅ Form validation
- ✅ CSS animations
- ✅ Project structure organization
- ✅ RESTful route patterns
- ✅ Frontend-backend integration

---

**Need Help?** Check the terminal output for error messages and refer to the troubleshooting section above.

**Happy Coding! 🚀**
