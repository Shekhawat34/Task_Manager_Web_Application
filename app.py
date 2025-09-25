from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime

app = Flask(__name__)

# Temporary storage for tasks
tasks = []
task_id_counter = 1

@app.route('/')
def home():
    """Home page displaying all tasks"""
    return render_template('index.html', tasks=tasks)

@app.route('/submit', methods=['POST'])
def submit():
    """Handle form submission for adding new tasks"""
    global task_id_counter
    
    task_title = request.form.get('task_title')
    task_description = request.form.get('task_description')
    task_priority = request.form.get('task_priority')
    
    if task_title:
        new_task = {
            'id': task_id_counter,
            'title': task_title,
            'description': task_description,
            'priority': task_priority,
            'status': 'Pending',
            'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        tasks.append(new_task)
        task_id_counter += 1
        
        return redirect(url_for('success', task_id=new_task['id']))
    
    return redirect(url_for('home'))

@app.route('/success/<int:task_id>')
def success(task_id):
    """Display confirmation page after task creation"""
    task = next((t for t in tasks if t['id'] == task_id), None)
    return render_template('success.html', task=task)

@app.route('/complete/<int:task_id>')

def complete_task(task_id):
    """Mark a task as completed"""
    for task in tasks:
        if task['id'] == task_id:
            task['status'] = 'Completed'
            break
    return redirect(url_for('home'))

@app.route('/delete/<int:task_id>')
def delete_task(task_id):
    """Delete a task"""
    global tasks
    tasks = [t for t in tasks if t['id'] != task_id]
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)